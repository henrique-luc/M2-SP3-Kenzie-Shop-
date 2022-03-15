//fetch('https://m2-kenzie-shop.herokuapp.com/products')
//.then(response => response.json())
//.then((data) => {
//    console.log(data)
//})

class App {

    static async requisicao() {
        const response = await fetch('https://m2-kenzie-shop.herokuapp.com/products')
        const data = await response.json()

        return data
    }

    static moedaReal(number) {
        return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    static async template() {
        let listaProdutos = await this.requisicao()
        console.log(listaProdutos)
        listaProdutos.products.forEach(produtos => {
            const {
                id,
                productName,
                price,
                promotionStatus,
                reviews
            } = produtos

            const mainToAppend = document.querySelector('main')
            const section = document.createElement('section')

            const estrelasVazias = 5 - reviews;

            if (promotionStatus === true) {
                section.innerHTML = `
                    <figure>
                        <img src="https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${id}/Image.png" alt="${productName}">
                        <figcaption>${productName}</figcaption>
                    </figure>
                    <span id="estrelas"></span>
                    <p>${productName}</p>
                    <h4 id="show--promocional">De ${this.moedaReal(price.productPrice)}</h4>
                    <span id="preco">Por ${this.moedaReal(price.productPromotionPrice)}</span>
                    <button>COMPRAR</button>
                `
            } else {
                section.innerHTML = `
                    <figure>
                        <img src="https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${id}/Image.png" alt="${productName}">
                        <figcaption>${productName}</figcaption>
                    </figure>
                    <span id="estrelas"></span>
                    <p>${productName}</p>
                    <h4></h4>
                    <span id="preco">${this.moedaReal(price.productPrice)}</span>
                    <button>COMPRAR</button>
                `
            }

            for(let i = 0; i < reviews; i++){
                const span = section.querySelector('#estrelas')
                const imgEstrela = document.createElement('img')
                imgEstrela.src = '/public/EstrelaCheia.svg'
                span.appendChild(imgEstrela)
            }

            for(let i = 0; i < estrelasVazias; i++){
                const span = section.querySelector('#estrelas')
                const imgEstrela = document.createElement('img')
                imgEstrela.src = '/public/EstrelaVazia.svg'
                span.appendChild(imgEstrela)
            }

            mainToAppend.appendChild(section)
        })
    }
}
App.template()