let product = document.getElementById('product')
let mark = document.getElementById('mark')
let price = document.getElementById('price').innerHTML
let amount = document.getElementById('amount')
let paymentFormSelected = document.getElementById('payment-form')
let changeSelected = document.getElementById('yes-or-no')
let sendOrderButton = document.getElementById('send-order')

$(window).on('load',function(){
    $('#askWhats').modal('show');
});

function showOrder(){
    if(amount.value == 1){
        document.getElementById('amount-info').innerHTML = '<b>' + amount.value + '</b> Botijão 13kg'
    }else{
        document.getElementById('amount-info').innerHTML = '<b>' + amount.value + '</b> Botijões 13kg'
    }

    let priceString = document.getElementById('price').innerHTML
    price = priceString.substring(3, 8)
    let total = amount.value * price

    document.getElementById('total-info').innerHTML = 'Total: <b>R$ ' + total.toFixed(2) + '</b>'
}

showOrder()

function chooseHowToPay(){
    var select = document.getElementById('payment-form')
    var selected = select.options[select.selectedIndex].text

    if(selected == "Dinheiro"){
       document.getElementById('yes-or-no').style.display = "block"
    }else if(selected !== "Dinheiro"){
        document.getElementById('yes-or-no').style.display = "none"
        document.getElementById('change').style.display = "none"
    }
}

function needChange(){
    var select = document.getElementById('yes-or-no')
    var selected = select.options[select.selectedIndex].text

    if(selected == "Sim, preciso de troco"){
       document.getElementById('change').style.display = "block"
    }else if(selected !== "Sim, preciso de troco"){
        document.getElementById('change').style.display = "none"
    }
}

// CAPTURA CEL PARA ENVIO DE PEDIDO TESTE
let startButton = document.getElementById('startButton')
let cel = ''

function startTest(){
    let cel = document.getElementById('cel').value
    if(cel.length < 11){
        document.getElementById('errorCel').innerHTML = '<b>Por favor, informe um número válido</b>'
        document.getElementById('cel').focus()
    }else{
        cel = '+55' + cel
        $('#askWhats').modal('hide')
    }
    console.log(cel)
}

let client = document.getElementById('name')
let address = document.getElementById('address')
let landmark = document.getElementById('landmark')
let change = document.getElementById('change')

// CARREGA A PÁGINA APÓS ENVIO DO PEDIDO
function sent(){
    window.location.href = "https://whatsapper.com.br/teste-finalizado/", "_self"
}

function sendOrder(){
    let cel = '+55' + document.getElementById('cel').value
    let total = amount.value * price
    total = total.toFixed(2)
    let msg = `*NOVO PEDIDO* \n\n Produto: ${product.innerHTML} \n Qde: *${amount.value}*  Total: *${total}* \n\n*DADOS PARA ENTREGA* \n\n Cliente: *${client.value}* \n Endereço: *${address.value}* \n Ponto de Ref: *${landmark.value}* \n Forma Pagto: *${paymentFormSelected.value}* \n Troco para: *${change.value}*`
    msg = window.encodeURIComponent(msg);

    if(client.value == ''){
        document.getElementById('error').innerHTML = '<b>Por favor, informe o nome</b>'
        document.getElementById('name').focus()
    }else if(address.value == ''){
        document.getElementById('error').innerHTML = '<b>Por favor, informe o endereço</b>'
        document.getElementById('address').focus()
    }else if(paymentFormSelected.value == ''){
        document.getElementById('error').innerHTML = '<b>Por favor, informe a forma de pagamento</b>'
        document.getElementById('payment-form').focus()
    }else if(paymentFormSelected.value == 'Dinheiro' && changeSelected.value == ''){
        document.getElementById('error').innerHTML = '<b>Por favor, informe se vai precisar de troco</b>'
        document.getElementById('yes-or-no').focus()
    }else if(changeSelected.value == 'Sim' && change.value == ''){
        document.getElementById('error').innerHTML = '<b>Por favor, informe com quanto vai pagar</b>'
        document.getElementById('change').focus()
    }else{
        if (window.matchMedia("(min-width: 400px)").matches) {
            window.open("https://web.whatsapp.com/send?phone=" + cel + "&text=" + msg, "_blank")
            sent()
            /* a viewport tem pelo menos 400 pixels de largura */
        } else {
            window.open("https://api.whatsapp.com/send?phone=" + cel + "&text=" + msg, "_blank")
            sent()
            /* a viewport menos que 400 pixels de largura */
        }   
    }
}

function myEvents(){
    amount.addEventListener("change", showOrder)
    paymentFormSelected.addEventListener("change", chooseHowToPay)
    changeSelected.addEventListener("change", needChange)
    sendOrderButton.addEventListener("click", sendOrder)
    startButton.addEventListener("click", startTest)
}
window.addEventListener("load", myEvents)



