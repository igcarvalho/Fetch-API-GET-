// Adiciona um evento de clique a todo o documento
document.addEventListener('click', e => {
  const el = e.target; // Captura o elemento clicado pelo usuário
  const tag = el.tagName.toLowerCase(); // Obtém o nome da tag HTML clicada (ex: 'a', 'div', etc.)

  // Verifica se o elemento clicado é uma tag <a>
  if (tag === 'a') {
    e.preventDefault(); // Impede o comportamento padrão do navegador (ir para outra página)
    carregaPagina(el); // Chama a função que vai carregar a página dinamicamente
  }
});

// Função responsável por carregar o conteúdo HTML da página clicada dinamicamente usando Fetch API
function carregaPagina(el) {
  const href = el.getAttribute('href'); // Obtém o URL contido no atributo 'href' do link clicado
  
  // Requisição HTTP com Fetch API
  fetch(href)
    .then(response => {
      // Valida se a resposta foi bem-sucedida (status HTTP 200)
      if (response.status !== 200) {
        throw new Error('Erro na requisição');
      }
      return response.text(); // Retorna o conteúdo HTML como texto
    })
    .then(html => {
      carregaResultado(html); // Chama função que exibe o conteúdo na tela
    })
    .catch(e => {
      console.log(e); // Em caso de erro, exibe mensagem no console
    });
}

// Função para inserir o HTML carregado no elemento com classe '.resultado'
function carregaResultado(response) {
  const resultado = document.querySelector('.resultado'); // Seleciona a div que receberá o HTML carregado
  resultado.innerHTML = response; // Insere o HTML carregado dinamicamente dentro da div
}

// Trecho adicional para fins de teste/debug (exemplo isolado)
// Realiza uma requisição diretamente a uma página específica ('pagina4.html')
fetch('pagina4.html')
  .then(resposta => {
    // Checa se a requisição foi bem-sucedida
    if (resposta.status !== 200) {
      throw new Error('Erro na requisição');
    }
    return resposta.text(); // Retorna o texto da página solicitada
  })
  .then(html => {
    console.log(html); // Exibe o conteúdo carregado no console (para teste)
  })
  .catch(e => {
    console.log(e); // Caso ocorra erro, mostra mensagem no console
  });

/*  
Código adicional comentado que mostra como implementar a requisição com XMLHttpRequest
(Utilizando abordagem com Promises e XMLHttpRequest ao invés do Fetch API)

// const request = obj => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest(); // Cria objeto XMLHttpRequest
//     xhr.open(obj.method, obj.url, true); // Inicializa requisição com método e URL
//     xhr.send(); // Envia requisição ao servidor

//     // Define o que fazer quando a requisição for concluída
//     xhr.addEventListener('load', () => {
//       if(xhr.status >= 200 && xhr.status < 300){
//         resolve(xhr.responseText); // Retorna sucesso com o conteúdo carregado
//       } else {
//         reject(xhr.statusText); // Rejeita caso a resposta não seja bem-sucedida
//     }
//   });
// });

// Exemplo de uso da função assíncrona com async/await comentado abaixo:
// async function carregaPagina(el) {
//   const href = el.getAttribute('href');
//   const response = await fetch(href);
//   if (response.status !== 200) throw new Error('Erro na requisição');
//   const html = await response.text();
//   document.querySelector('.resultado').innerHTML = html;
// }

*/