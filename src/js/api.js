import { GoogleGenerativeAI } from "@google/generative-ai";
import { expenses, clearExpenses, removeExpense, getTotalAmountByType } from "./script.js";

const API_KEY = "COLE_AQUI_SUA_CHAVE_API";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(text) {
  const textos = document.getElementById("textos");
  textos.classList.add('animation');

  const generationConfig = {
    temperature: 1
  };

  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

  const prompt = "Faça um breve resumo sobre os seguintes gastos, levando em consideração seu número de ocorrências e valor total: " + text + "Após isso, dê breves dicas de como reduzir os custos mais proeminentes.";
  const result = await model.generateContent(prompt);
  const response = await result.response;

  const generatedText = response.text();

  const textodiv = document.getElementById('texto');
  var regex = /\*\*(.*?)\*\*/g;
  var newtext = generatedText.replaceAll(regex, "<br><b>$1</b>");
  newtext = newtext.replaceAll('*', '<br><br>');

  var paragraph = document.createElement('p');
  paragraph.innerHTML = newtext;
  textodiv.appendChild(paragraph);

  textos.classList.remove('animation');
}

document.getElementById("new").onclick = function () {
  window.location.href = "newspend.html";
};

function printExpenses() {
  var expensesdiv = document.getElementById('expenses');
  expensesdiv.innerHTML = '';

  expenses.forEach((item) => {
    var paragraph = document.createElement('p');
    paragraph.innerHTML = "Nome: " + item.name + "<br>Custo: R$" + item.cost + "<br>Tipo: " + item.type;
    paragraph.classList.add("gray");
    paragraph.classList.add("test");
    expensesdiv.appendChild(paragraph);

    var removebtn = document.createElement('button');
    removebtn.textContent = "❌";
    removebtn.onclick = function() {
        removeExpense(item.id);
        printExpenses();
        printTotal();
        if(expenses == 0){
            const textodiv = document.getElementById('texto');
            textodiv.innerHTML = '';
        }
        else {
            const textodiv = document.getElementById('texto');
            textodiv.innerHTML = '';
            run(JSON.stringify(expenses));
        }
    };
    paragraph.appendChild(removebtn);
  });
}

function printTotal(){
  var totaldiv = document.getElementById('totaltxt');
  totaldiv.innerHTML = '';
  var totalNumber = expenses.length;
  var ptotal = document.createElement('p');
  ptotal.innerHTML = "Número total de gastos: " + totalNumber;
  ptotal.classList.add("gray");
  totaldiv.appendChild(ptotal);

  const types = ['Contas Domésticas', 'Aluguel', 'Mercado', 'Delivery', 'Transp. privado', 'Transp. Público', 'Combustível', 'Carro', 'Finanças', 'Medicamentos', 'Saúde', 'Educação', 'Entretenimento', 'Vestuário', 'Outros'];
  let totalAmount = 0;
  for(var i = 0; i < types.length; i++){
      let type = types[i];
      let expense = getTotalAmountByType(type);
      const occurrences = expense[0];
      const amount = expense[1];
      if (expense != 0){
          totalAmount = expense[2];
          var ptotal = document.createElement('p');
          ptotal.innerHTML =  type + ": " + "Ocorrências: " + occurrences + "<br>Valor total: R$" + amount; 
          ptotal.classList.add("gray");
          totaldiv.appendChild(ptotal);
      }
  }
  
  var ptotal = document.createElement('p');
  ptotal.innerHTML = "Total: R$" + totalAmount;
  ptotal.classList.add("red");
  totaldiv.appendChild(ptotal);
}

window.onload = function() {

  printExpenses();
  printTotal()
  if(expenses.length > 0){
      run(JSON.stringify(expenses));
  }

}

document.getElementById("del").onclick = function () {
  clearExpenses();
  location.reload();
};