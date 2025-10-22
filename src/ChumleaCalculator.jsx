import React, { useState } from 'react';
import { Calculator, User, Ruler, Activity, RefreshCw } from 'lucide-react';

export default function ChumleaCalculator() {
  const [data, setData] = useState({
    circumferenciaPanturrilha: '',
    circumferenciaBraco: '',
    alturaJoelho: '',
    idade: '',
    sexo: '',
    raca: ''
  });

  const [resultados, setResultados] = useState(null);

  const calcularEstimativas = () => {
    const cb = parseFloat(data.circumferenciaBraco);
    const aj = parseFloat(data.alturaJoelho);
    const idade = parseFloat(data.idade);
    const sexo = data.sexo;
    const raca = data.raca;
    const idoso = idade > 60;

    let alturaEstimada;
    let pesoEstimado;
    
    if (idoso) {
      if (sexo === 'masculino') {
        alturaEstimada = 64.19 + (2.04 * aj) - (0.04 * idade);
        if (raca === 'branca') {
          pesoEstimado = (aj * 1.10) + (cb * 3.07) - 75.81;
        } else {
          pesoEstimado = (aj * 0.44) + (cb * 2.86) - 39.21;
        }
      } else {
        alturaEstimada = 84.88 + (1.83 * aj) - (0.24 * idade);
        if (raca === 'branca') {
          pesoEstimado = (aj * 1.09) + (cb * 2.68) - 65.51;
        } else {
          pesoEstimado = (aj * 1.50) + (cb * 2.58) - 84.22;
        }
      }
    } else {
      if (sexo === 'masculino') {
        if (raca === 'branca') {
          alturaEstimada = 71.85 + (1.88 * aj);
          pesoEstimado = (aj * 1.19) + (cb * 3.21) - 86.82;
        } else {
          alturaEstimada = 73.42 + (1.79 * aj);
          pesoEstimado = (aj * 1.09) + (cb * 3.14) - 83.72;
        }
      } else {
        if (raca === 'branca') {
          alturaEstimada = 70.25 + (1.87 * aj) - (0.06 * idade);
          pesoEstimado = (aj * 1.01) + (cb * 2.81) - 60.04;
        } else {
          alturaEstimada = 68.10 + (1.87 * aj) - (0.06 * idade);
          pesoEstimado = (aj * 1.24) + (cb * 2.97) - 82.48;
        }
      }
    }

    const alturaMetros = alturaEstimada / 100;
    const imc = pesoEstimado / (alturaMetros * alturaMetros);

    const sexoTexto = sexo === 'masculino' ? 'Homem' : 'Mulher';
    const racaTexto = raca === 'branca' ? 'Branco(a)' : 'Negro(a)';
    const faixaTexto = idoso ? 'Acima de 60 anos' : '18-60 anos';
    
    const calculoIMC = `IMC = ${pesoEstimado.toFixed(1)} kg ÷ (${alturaMetros.toFixed(2)} m)² = ${imc.toFixed(1)}`;

    setResultados({
      altura: alturaEstimada.toFixed(1),
      peso: pesoEstimado.toFixed(1),
      imc: imc.toFixed(1),
      faixaEtaria: faixaTexto,
      criterios: `${sexoTexto} / ${racaTexto} / ${faixaTexto}`,
      calculoIMC: calculoIMC,
      idade: idade
    });
  };

  const handleSubmit = () => {
    if (data.circumferenciaBraco && data.alturaJoelho && data.idade && data.sexo && data.raca) {
      calcularEstimativas();
    }
  };

  const limparDados = () => {
    setData({
      circumferenciaPanturrilha: '',
      circumferenciaBraco: '',
      alturaJoelho: '',
      idade: '',
      sexo: '',
      raca: ''
    });
    setResultados(null);
  };

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const classificarIMC = (imc, idade) => {
    const idoso = idade > 60;
    
    if (idoso) {
      if (imc < 22) return { texto: 'Magreza', cor: 'text-blue-600' };
      if (imc >= 22 && imc <= 27) return { texto: 'Eutrofia', cor: 'text-green-600' };
      if (imc > 27) return { texto: 'Excesso de peso', cor: 'text-orange-600' };
    } else {
      if (imc < 16.0) return { texto: 'Magreza Grau III', cor: 'text-red-700' };
      if (imc >= 16.0 && imc <= 16.9) return { texto: 'Magreza Grau II', cor: 'text-red-600' };
      if (imc >= 17.0 && imc <= 18.4) return { texto: 'Magreza Grau I', cor: 'text-blue-600' };
      if (imc >= 18.5 && imc < 25) return { texto: 'Peso normal', cor: 'text-green-600' };
      if (imc >= 25 && imc < 30) return { texto: 'Sobrepeso', cor: 'text-yellow-600' };
      if (imc >= 30 && imc < 35) return { texto: 'Obesidade Grau I', cor: 'text-orange-600' };
      if (imc >= 35 && imc < 40) return { texto: 'Obesidade Grau II', cor: 'text-red-600' };
      if (imc >= 40) return { texto: 'Obesidade Grau III', cor: 'text-red-800' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-orange-500 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <img 
                src="https://i.imgur.com/9VYm3Kp.png" 
                alt="FPB Logo" 
                className="h-16 sm:h-20 object-contain"
              />
              <div className="text-white text-center sm:text-right">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                  Calculadora Antropométrica
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Estágios Hospitalares - FPB
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              <p className="text-gray-600 text-sm sm:text-base">Estimativa de peso e altura através de medidas antropométricas (Método Chumlea)</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 flex items-center gap-2 pb-2 border-b-2 border-indigo-200">
                    <Ruler className="w-5 h-5 text-indigo-600" />
                    Medidas Corporais
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Circunferência do Braço (cm) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={data.circumferenciaBraco}
                      onChange={(e) => handleChange('circumferenciaBraco', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Ex: 28.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Altura do Joelho (cm) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={data.alturaJoelho}
                      onChange={(e) => handleChange('alturaJoelho', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Ex: 52.0"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 flex items-center gap-2 pb-2 border-b-2 border-indigo-200">
                    <User className="w-5 h-5 text-indigo-600" />
                    Dados Pessoais
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idade (anos) *
                    </label>
                    <input
                      type="number"
                      value={data.idade}
                      onChange={(e) => handleChange('idade', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Ex: 65"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexo *
                    </label>
                    <select
                      value={data.sexo}
                      onChange={(e) => handleChange('sexo', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Raça/Etnia *
                    </label>
                    <select
                      value={data.raca}
                      onChange={(e) => handleChange('raca', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="">Selecione</option>
                      <option value="branca">Branca/Caucasiana</option>
                      <option value="negra">Negra/Afrodescendente</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Calculator className="w-5 h-5" />
                  Calcular Estimativas
                </button>

                <button
                  onClick={limparDados}
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <RefreshCw className="w-5 h-5" />
                  Limpar Dados
                </button>
              </div>
            </div>

            {resultados && (
              <div className="mt-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border-2 border-indigo-200 shadow-inner">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Resultados</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Altura Estimada</p>
                    <p className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-1">{resultados.altura}</p>
                    <p className="text-sm text-gray-500">centímetros</p>
                  </div>

                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Peso Estimado</p>
                    <p className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-1">{resultados.peso}</p>
                    <p className="text-sm text-gray-500">quilogramas</p>
                  </div>

                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                    <p className="text-sm text-gray-600 mb-2 font-medium">IMC Estimado</p>
                    <p className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-1">{resultados.imc}</p>
                    <p className={`text-sm sm:text-base font-semibold ${classificarIMC(parseFloat(resultados.imc), resultados.idade).cor}`}>
                      {classificarIMC(parseFloat(resultados.imc), resultados.idade).texto}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-indigo-100 border-2 border-indigo-300 rounded-xl p-4 sm:p-5">
                  <p className="text-sm font-semibold text-indigo-900 mb-2">📋 Critérios Utilizados:</p>
                  <p className="text-base sm:text-lg text-indigo-800 font-medium">
                    {resultados.criterios}
                  </p>
                </div>

                <div className="mt-4 bg-green-100 border-2 border-green-300 rounded-xl p-4 sm:p-5">
                  <p className="text-sm font-semibold text-green-900 mb-2">🧮 Cálculo do IMC:</p>
                  <p className="text-sm sm:text-base text-green-800 font-mono break-all">
                    {resultados.calculoIMC}
                  </p>
                </div>

                <div className="mt-4 bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-yellow-900">
                    <strong>⚠️ Nota Importante:</strong> Estas são estimativas baseadas em fórmulas antropométricas validadas (Método Chumlea). 
                    Os valores devem ser interpretados por profissionais de saúde qualificados e não substituem avaliações clínicas completas.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}