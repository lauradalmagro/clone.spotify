import {
    criarMusica,
    buscarMusicas,
    editarMusica,
    excluirMusica
} from "./crud.js";


const formulario = document.getElementById("form-musica");

const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const estilo = document.getElementById("estilo");
const duracao = document.getElementById("duracao");
const capaUrl = document.getElementById("capaUrl");
const audioUrl = document.getElementById("audioUrl");

const listaMusicas = document.getElementById("lista-musicas");


// CADASTRAR MÚSICA

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    try {

        await criarMusica(
            titulo.value.trim(),
            artista.value.trim(),
            estilo.value.trim(),
            duracao.value.trim(),
            capaUrl.value.trim(),
            audioUrl.value.trim()
        );

        alert("Música cadastrada com sucesso!");

        formulario.reset();

    } catch (erro) {

        console.error("Erro ao cadastrar música:", erro);

        alert("Erro ao cadastrar a música.");
    }

});


// MOSTRAR MÚSICAS

buscarMusicas((musicas) => {

    listaMusicas.innerHTML = "";

    musicas.forEach((musica) => {

        const card = document.createElement("div");

        card.classList.add("musica");

        card.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa da música">

            <div class="informacoes">

                <h3>${musica.titulo}</h3>

                <p>${musica.artista}</p>

                <p>${musica.estilo} • ${musica.duracao}</p>

            </div>

            <div class="acoes">

                <button class="btn-editar">
                    Editar
                </button>

                <button class="btn-excluir">
                    Excluir
                </button>

            </div>
        `;


        // BOTÃO EXCLUIR

        const botaoExcluir = card.querySelector(".btn-excluir");

        botaoExcluir.addEventListener("click", async () => {

            const confirmar = confirm(
                `Deseja excluir "${musica.titulo}"?`
            );

            if (!confirmar) {
                return;
            }

            try {

                await excluirMusica(musica.id);

                alert("Música excluída com sucesso!");

            } catch (erro) {

                console.error("Erro ao excluir:", erro);

                alert("Erro ao excluir a música.");
            }

        });


        // BOTÃO EDITAR

        const botaoEditar = card.querySelector(".btn-editar");

        botaoEditar.addEventListener("click", async () => {

            const novoTitulo = prompt(
                "Novo título:",
                musica.titulo
            );

            if (novoTitulo === null) {
                return;
            }


            const novoArtista = prompt(
                "Novo artista:",
                musica.artista
            );

            if (novoArtista === null) {
                return;
            }


            const novoEstilo = prompt(
                "Novo estilo:",
                musica.estilo
            );

            if (novoEstilo === null) {
                return;
            }


            const novaDuracao = prompt(
                "Nova duração:",
                musica.duracao
            );

            if (novaDuracao === null) {
                return;
            }


            const novaCapaUrl = prompt(
                "Novo link da capa:",
                musica.capaUrl
            );

            if (novaCapaUrl === null) {
                return;
            }


            const novoAudioUrl = prompt(
                "Novo link do áudio:",
                musica.audioUrl
            );

            if (novoAudioUrl === null) {
                return;
            }


            try {

                await editarMusica(
                    musica.id,
                    novoTitulo.trim(),
                    novoArtista.trim(),
                    novoEstilo.trim(),
                    novaDuracao.trim(),
                    novaCapaUrl.trim(),
                    novoAudioUrl.trim()
                );

                alert("Música editada com sucesso!");

            } catch (erro) {

                console.error("Erro ao editar:", erro);

                alert("Erro ao editar a música.");
            }

        });


        listaMusicas.appendChild(card);

    });

});