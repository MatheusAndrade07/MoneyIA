window.addEventListener('DOMContentLoaded', (event) => {
    var savedGastos = localStorage.getItem('gastos');
    var savedID = localStorage.getItem('id');
    if (savedGastos) {
        gastos = JSON.parse(savedGastos);
        id = JSON.parse(savedID);
    }

    const form = document.getElementById('form');

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        var nome = document.getElementById('nome');
        var custo = document.getElementById('custo');
        var tipo = document.getElementById('tipo');
        var desc = document.getElementById('desc');

        var gasto = {
            "id": id,
            "nome": nome.value,
            "custo": custo.value,
            "tipo": tipo.value,
            "desc": desc.value
        }

        id++;
        
        gastos.push(gasto);

        localStorage.setItem('id', JSON.stringify(id));
        localStorage.setItem('gastos', JSON.stringify(gastos));

        window.location.href = "index.html";
    });
});

document.getElementById("cashai").onclick = function () {
    window.location.href = "index.html";
};


export let gastos = [];
let id = 1;

export function limparGastos() {
    gastos = [];
    id = 0;
    localStorage.removeItem('gastos');
    localStorage.removeItem('id');
}

export function remove(id) {
    const removeIndex = gastos.findIndex( item => item.id === id );
    gastos.splice(removeIndex, 1 );
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('gastos', JSON.stringify(gastos));
}

export function amount(tipo) {
    let contador = 0;
    let valor = 0;
    let valortotal = 0;
    for (let i = 0; i < gastos.length; i++) {
        valortotal = valortotal + Number(gastos[i].custo);

        if (gastos[i].tipo === tipo) {
            contador++;
            var n1 = Number(gastos[i].custo);
            valor = valor + n1;
        }
    }
    if(contador == 0){
        return 0;
    }else{
        return [contador, valor, valortotal];
    }
    
}


