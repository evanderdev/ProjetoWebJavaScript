/*/ Carregar produtos do site/*/

let produtos = [{ id: "01", img: "./img/img_2.png", nome: "camiseta mescla", preco: "28", cor: "cinza", tamanho: ["p", "m", "g", "gg"], data: "01/07/2020" },
{ id: "02", img: "./img/img_3.png", nome: "saia em couro", preco: "398", cor: "preto", tamanho: ["36", "38", "40", "42"], data: "02/07/2020" },
{ id: "03", img: "./img/img_4.png", nome: "cardigan tigre", preco: "398", cor: "laranja", tamanho: ["p", "m", "g", "gg"], data: "05/07/2020" },
{ id: "04", img: "./img/img_5.png", nome: "cardigan off white", preco: "99.90", cor: "offWhite", tamanho: ["p", "m", "g", "gg"], data: "04/07/2020" },
{ id: "05", img: "./img/img_6.png", nome: "body leopardo", preco: "129.90", cor: "amarelo", tamanho: ["p", "m", "g", "gg"], data: "05/07/2020" },
{ id: "06", img: "./img/img_7.png", nome: "casaco pelos", preco: "398", cor: "rosa", tamanho: ["p", "m", "g", "gg"], data: "03/07/2020" },
{ id: "07", img: "./img/img_8.png", nome: "cropped stripes", preco: "120", cor: "amarelo", tamanho: ["p", "m", "g", "gg"], data: "07/07/2020" },
{ id: "08", img: "./img/img_9.png", nome: "camiseta transparente", preco: "398", cor: "preto", tamanho: ["p", "m", "g", "gg"], data: "07/07/2020" },
{ id: "09", img: "./img/img_10.png", nome: "pochete clutch", preco: "99", cor: "preto", tamanho: ["u"], data: "08/07/2020" },
{ id: "10", img: "./img/img_2.png", nome: "camiseta mescla", preco: "35.90", cor: "cinza", tamanho: ["p", "m", "g", "gg"], data: "08/07/2020" }];

let prod = '';
let produtosLista = [];
function carregarProdutos(produtos) {
    produtos.forEach(i => {
        let valor = Number(i.preco);

        prod = `<li>
                    <div class="imagem-produto">
                        <img src="${i.img}" alt="">
                    </div>
                <div class="info-produto-nome">
                    ${i.nome}
                </div>
                <div class="info-produto-valor">
                    R$${valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                `
        if (i.preco > 300) {
            valor = i.preco / 5;
            prod +=
                `<div class="info-produto-parcela">
                    até 5x de R$${valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>`
        } else {
            valor = i.preco / 3;
            prod +=
                `<div class="info-produto-parcela">
                    até 3x de R$${valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>`
        }
        prod +=
            `<div>
                <button id="comprar">COMPRAR</button>
            </div>
        </li>`

        produtosLista.push(prod);
    });
}

carregarProdutos(produtos);
$("#list-produtos-layout").append(produtosLista);

/*/ Fim Carregar produtos do site/*/

/*/ Carregar cores do filtro de cores/*/

let cores = '';
let cor = [];
let cont = 0;
let corUnica = [];

function carregarCores(produtos) {
    produtos.forEach(i => {
        cor.push(i.cor);
    });

    corUnica = [...new Set(cor)];
}

function carregarCoresUnicas(corUnica) {
    corUnica.forEach(i => {
        cores +=
            `<div id="filtro-input-cores">
            <input type="checkbox" id=${corUnica[cont]} name=${corUnica[cont]} class="checkbox-style">
            <label for=${corUnica[cont]} >${corUnica[cont]}</label>
            </div>`
        cont = cont + 1;
    });
}

carregarCores(produtos);
carregarCoresUnicas(corUnica);
$("#lista-cores").append(cores);

/*/Fim Carregar cores do filtro de cores/*/

/*/ filtrar produtos por cores/*/

let attrFiltro = [];
const produtos2 = produtos;

$('.checkbox-style').click(function () {
    if ($('.checkbox-style').is(':checked') && (attrFiltro.indexOf(this.id) === -1)) {
        attrFiltro.push(this.id);
        produtos = [];
        for (var i = 0; i < attrFiltro.length; i++) {
            produtosLista = [];
            $("#list-produtos-layout li").detach();
            if (attrFiltro[i] === '0a50') {
                produtos = produtos.filter(function (produto) {
                    return produto.preco < 50;
                })
            }
            if (attrFiltro[i] === "51a150") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 50 && produto.preco < 150;
                })
            }
            if (attrFiltro[i] === "151a300") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 150 && produto.preco < 300;
                })
            }
            if (attrFiltro[i] === "301a500") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 300 && produto.preco < 500;
                })
            }
            if (attrFiltro[i] === "maiorque1") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 1;
                })
            }
            produtos = produtos.concat(produtos2.filter(function (produto) {
                return produto.cor === attrFiltro[i]
            }));

        }
        carregarProdutos(produtos);
        $("#list-produtos-layout").append(produtosLista);
    } else {
        attrFiltro.splice(attrFiltro.indexOf(this.id), 1);
        produtos = [];
        for (var i = 0; i < attrFiltro.length; i++) {
            produtosLista = [];
            $("#list-produtos-layout li").detach();
            if (attrFiltro[i] === '0a50') {
                produtos = produtos.filter(function (produto) {
                    return produto.preco < 50;
                })
            }
            if (attrFiltro[i] === "51a150") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 50 && produto.preco < 150;
                })
            }
            if (attrFiltro[i] === "151a300") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 150 && produto.preco < 300;
                })
            }
            if (attrFiltro[i] === "301a500") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 300 && produto.preco < 500;
                })
            }
            if (attrFiltro[i] === "maiorque1") {
                produtos = produtos.filter(function (produto) {
                    return produto.preco > 1;
                })
            }
            produtos = produtos.concat(produtos2.filter(function (produto) {
                return produto.cor === attrFiltro[i]
            }));
        }
        $("#list-produtos-layout li").detach();
        produtosLista = [];
        if (attrFiltro.length <= 0) {
            produtos = produtos2;
        }
        carregarProdutos(produtos)
        $("#list-produtos-layout").append(produtosLista);
    }
});

/*/ fim filtrar produtos por cores/*/

/*/ Carregar tamanhos do filtro de tamanho/*/

let tam = [];
let tamUn = [];
let tamUnico = [];
let tamUni = []

function carregarTamanhos(produtos) {
    produtos.forEach(i => {
        tam.push(i.tamanho);
    });
tamUn = tam.join(",")
tamUn.split(",")
tamUn.forEach(i=>{
    
})
//tamUn = tamUn.concat(tam[0], tam[1], tam[2], tam[3], tam[4], tam[5], tam[6], tam[7], tam[8], tam[9]);
    tamUn = [...new Set(tamUn)];
    
}

function carregarTamanhosUnicos(tamUn) {
    tamUn.forEach(i => {
        tamUnico += `
            <li class="filtro-input" >
                <input type="checkbox" id="${i}" name="${i}" class="checkbox-style-tamanho">
                <label for="${i}" class="label-tamanho">${i}</label>
            </li>
    `
    });
}

carregarTamanhos(produtos);
carregarTamanhosUnicos(tamUn);
$("#tamanhos").append(tamUnico);

/*/ Fim Carregar tamanhos do filtro de tamanho/*/

/*/ filtrar produtos por tamanho/*/

$('.checkbox-style-tamanho').click(function () {
    if ($('.checkbox-style-tamanho').is(':checked') && (attrFiltro.indexOf(this.id) === -1)) {
        attrFiltro.push(this.id);
        console.log(attrFiltro)
        for (var i = 0; i < attrFiltro.length; i++) {
            produtosLista = [];
            $("#list-produtos-layout li").detach();
            produtos = produtos.filter(function (produto) {
                return produto.tamanho === attrFiltro[i]
            });
        }
        carregarProdutos(produtos);
        $("#list-produtos-layout").append(produtosLista);
    } else {
        attrFiltro.splice(attrFiltro.indexOf(this.id), 1);
    }
    $("#list-produtos-layout li").detach();
    produtosLista = [];
    if (attrFiltro.length <= 0) {
        produtos = produtos2;
    }
    carregarProdutos(produtos)
    $("#list-produtos-layout").append(produtosLista);
});

/*/ fim filtrar produtos por tamanho/*/

/*/ Ordenar produtos/*/

$("#ordenar").change(function () {
    var valorOrdenar = $(this).val();
    if (valorOrdenar === "mais-recentes") {
        $("#list-produtos-layout li").detach();
        produtos = produtos.sort(function (a, b) {
            return (a.data, 10 > b.data) ? 1 : (a.data < b.data) ? -1 : 0;
        });
        produtosLista = [];
        carregarProdutos(produtos)
        $("#list-produtos-layout").append(produtosLista);
    }
    if (valorOrdenar === "menor-preço") {
        $("#list-produtos-layout li").detach();
        produtos = produtos.sort(function (a, b) {
            return (parseInt(a.preco, 10) > parseInt(b.preco, 10)) ? 1 : ((parseInt(a.preco, 10) < parseInt(b.preco, 10)) ? -1 : 0);
        });
        produtosLista = [];
        carregarProdutos(produtos)
        $("#list-produtos-layout").append(produtosLista);
    }
    if (valorOrdenar === "maior-preço") {
        $("#list-produtos-layout li").detach();
        produtos = produtos.sort(function (a, b) {
            return (parseInt(a.preco, 10) > parseInt(b.preco, 10)) ? -1 : ((parseInt(a.preco, 10) < parseInt(b.preco, 10)) ? 1 : 0);
        });
        produtosLista = [];
        carregarProdutos(produtos)
        $("#list-produtos-layout").append(produtosLista);
    }
});
/*/ Fim Ordenar produtos/*/
