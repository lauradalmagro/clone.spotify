import { database } from "./configfirebase.js";

import {
    ref,
    push,
    set,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

export async function criarMusica(
    titulo,
    artista,
    estilo,
    duracao,
    capaBase64,
    audioBase64
) {

    const musicasRef = ref(database, "musicas");

    const novaMusicaRef = push(musicasRef);


    const musica = {

        id: novaMusicaRef.key,

        titulo: titulo,

        artista: artista,

        estilo: estilo,

        duracao: duracao,

        capaBase64: capaBase64,

        audioBase64: audioBase64

    };


    await set(novaMusicaRef, musica);

}

export function buscarMusicas(callback) {

    const musicasRef = ref(database, "musicas");


    onValue(musicasRef, (snapshot) => {

        const dados = snapshot.val();

        const musicas = [];


        if (dados) {

            Object.values(dados).forEach((musica) => {

                musicas.push(musica);

            });

        }


        callback(musicas);

    });

}

export async function editarMusica(
    id,
    titulo,
    artista,
    estilo,
    duracao,
    capaBase64,
    audioBase64
) {

    const musicaRef = ref(
        database,
        `musicas/${id}`
    );


    await update(musicaRef, {

        titulo: titulo,

        artista: artista,

        estilo: estilo,

        duracao: duracao,

        capaBase64: capaBase64,

        audioBase64: audioBase64

    });

}

export async function excluirMusica(id) {

    const musicaRef = ref(
        database,
        `musicas/${id}`
    );


    await remove(musicaRef);

}