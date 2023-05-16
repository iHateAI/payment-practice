const paymentButton = document.querySelector('.payment-btn');

const payment = (event) => {
  const payload = {
    clientId: 'S2_a0e115953f0d4ecea8a0e9e4533ef114',
    method: 'card',
    orderId: '306609f4-3d99-4b6f-9d61-0a429f01c66a',
    amount: 100,
    goodsName: '테스트 상품',
    returnUrl: 'http://localhost:3000/payment/auth', //API를 호출할 Endpoint 입력
    fnError: function (result) {
      alert('개발자확인용 : ' + result.errorMsg + '');
    },
  };

  AUTHNICE.requestPay(payload);
};

paymentButton.onclick = payment;
