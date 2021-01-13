'use strict';
/* 
O puppeteer é um 'headless browser'. Ele vai ser o módulo q vai tirar as
screenshots do website
*/
const puppeteer = require('puppeteer');
// Utilizarei o módulo Minimist para cuidar dos argumentos
const argv = require('minimist')(process.argv.slice(2));


//Inicialização
async function run () {
    try {
        //Inicializa o browser
        const browser = await puppeteer.launch()
        .then(async (browser) => {
            console.log('[LOG] Iniciando o navegador...');
            //Cria uma nova guia no navegador
           const page = await browser.newPage().then(async (page) => {
                console.log('[LOG] Nova guia criada')
                //Seta a resolução
                await page.setViewport({height: 3840, width: 2160})
                //Acessa a url que será passada na hora de executar o arquivo main
                 await page.goto(`${argv.URL}`).then((v) => {console.log('[LOG] Carregando o site...')});
                // Tira a screenshot e salva em pdf na pasta que será passada nos argumentos
                await page.pdf({printBackground: true,path: `${argv.PATH}/${argv.FILENAME}.pdf`,format: "Letter",margin: {top: "20px",bottom: "40px",left: "20px",right: "20px"}})
                .then((v) => console.log('[LOG] Salvando o PDF...'));
                // Tira a screenshot e salva em png na pasta que será passada nos argumentos
                await page.screenshot({path:`${argv.PATH}/${argv.FILENAME}.png`})
                .then((v) => console.log('[LOG] Salvando o PNG...'))
        
                //Fecha o navegador
                await browser.close().then((v) => {
                    console.log('[LOG] Feito!')
                });
            });
    });

    } catch (e) {
        console.log(`[Erro]: ${e} \n Aperte CTRL + C para finalizar.`);
    }
}

run();