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

const capa = document.getElementById("capa");
const audio = document.getElementById("audio");

const listaMusicas = document.getElementById("lista-musicas");

function arquivoParaBase64(arquivo) {

    return new Promise((resolve, reject) => {

        const leitor = new FileReader();

        leitor.onload = () => {
            resolve(leitor.result);
        };

        leitor.onerror = () => {
            reject(leitor.error);
        };

        leitor.readAsDataURL(arquivo);

    });

}

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();


    const arquivoCapa = capa.files[0];
    const arquivoAudio = audio.files[0];

    if (!arquivoCapa) {
        alert("Selecione uma imagem para a capa.");
        return;
    }

    if (!arquivoAudio) {
        alert("Selecione um arquivo MP3.");
        return;
    }

    if (
        arquivoCapa.type !== "image/jpeg" &&
        arquivoCapa.type !== "image/png"
    ) {

        alert("A capa precisa ser uma imagem JPG ou PNG.");
        return;

    }

    if (
        arquivoAudio.type !== "audio/mpeg" &&
        !arquivoAudio.name.toLowerCase().endsWith(".mp3")
    ) {

        alert("O arquivo de áudio precisa ser MP3.");
        return;

    }


    try {

        const capaBase64 = await arquivoParaBase64(arquivoCapa);

        const audioBase64 = await arquivoParaBase64(arquivoAudio);

        await criarMusica(
            titulo.value.trim(),
            artista.value.trim(),
            estilo.value.trim(),
            duracao.value.trim(),
            capaBase64,
            audioBase64
        );


        alert("Música cadastrada com sucesso!");

        formulario.reset();

    } catch (erro) {

        console.error("Erro ao cadastrar música:", erro);

        alert("Erro ao cadastrar a música.");

    }

});

buscarMusicas((musicas) => {

    listaMusicas.innerHTML = "";


    musicas.forEach((musica) => {

        const card = document.createElement("div");

        card.classList.add("musica");


        card.innerHTML = `
            <img
                src="${musica.capaBase64}"
                alt="Capa da música"
            >

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


            try {

                await editarMusica(
                    musica.id,
                    novoTitulo.trim(),
                    novoArtista.trim(),
                    novoEstilo.trim(),
                    novaDuracao.trim(),
                    musica.capaBase64,
                    musica.audioBase64
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