import { buscarMusicas } from "./crud.js";


const listaMusicas = document.getElementById("lista-musicas");

const capaAtual = document.getElementById("capa-atual");

const tituloAtual = document.getElementById("titulo-atual");

const artistaAtual = document.getElementById("artista-atual");

const audioPlayer = document.getElementById("audio-player");

buscarMusicas((musicas) => {

    listaMusicas.innerHTML = "";


    musicas.forEach((musica) => {

        const card = document.createElement("div");

        card.classList.add("musica");


        card.innerHTML = `

            <img
                src="${musica.capaBase64}"
                alt="Capa de ${musica.titulo}"
            >

            <div class="informacoes">

                <h3>${musica.titulo}</h3>

                <p>${musica.artista}</p>

                <p>
                    ${musica.estilo} • ${musica.duracao}
                </p>

            </div>

            <button class="botao-play">
                ▶
            </button>

        `;


        const botaoPlay =
            card.querySelector(".botao-play");

        botaoPlay.addEventListener("click", () => {

            capaAtual.src = musica.capaBase64;

            tituloAtual.textContent =
                musica.titulo;

            artistaAtual.textContent =
                musica.artista;


            audioPlayer.src =
                musica.audioBase64;


            audioPlayer.load();


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