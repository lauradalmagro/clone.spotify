import { buscarMusicas } from "./crud.js";


const listaMusicas = document.getElementById("lista-musicas");

const capaAtual = document.getElementById("capa-atual");
const tituloAtual = document.getElementById("titulo-atual");
const artistaAtual = document.getElementById("artista-atual");

const audioPlayer = document.getElementById("audio-player");


// BUSCAR MÚSICAS DO FIREBASE

buscarMusicas((musicas) => {

    listaMusicas.innerHTML = "";


    musicas.forEach((musica) => {

        const card = document.createElement("div");

        card.classList.add("musica");


        card.innerHTML = `
            <img 
                src="${musica.capaUrl}" 
                alt="Capa de ${musica.titulo}"
            >

            <div class="informacoes">

                <h3>${musica.titulo}</h3>

                <p>${musica.artista}</p>

                <p>${musica.estilo} • ${musica.duracao}</p>

            </div>

            <button class="botao-play">
                ▶
            </button>
        `;


        // BOTÃO PLAY

        const botaoPlay = card.querySelector(".botao-play");


        botaoPlay.addEventListener("click", () => {

            // Atualiza as informações do player

            capaAtual.src = musica.capaUrl;

            tituloAtual.textContent = musica.titulo;

            artistaAtual.textContent = musica.artista;


            // Coloca o áudio

            audioPlayer.src = musica.audioUrl;

            audioPlayer.load();


            // Começa a tocar

            audioPlayer.play().catch((erro) => {

                console.error(
                    "Não foi possível reproduzir o áudio:",
                    erro
                );

            });

        });


        listaMusicas.appendChild(card);

    });

});