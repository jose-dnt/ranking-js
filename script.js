const clear = require("console-clear")
const select = require("@inquirer/prompts").select
const separator = require("@inquirer/prompts").Separator
const input = require("@inquirer/prompts").input
const colors = require("yoctocolors-cjs");

function print(mensagem) {
    console.log(mensagem)
}

async function main() {

    const times = []

    const partidas = []

    function menuPrincipal() {

        return select(
            {
                message: '',
                choices: [
                    { name: '      Times', value: 'Times' },
                    { name: '      Partidas', value: 'Partidas' },
                    { name: '      Ranking', value: 'Ranking' },
                    { name: '      Sair', value: 'Sair' }
                ],
                theme: {
                    prefix: '',
                    style: {
                        help: () => '',
                        highlight: (choice) => colors.green('      ❯ ' + choice.trim()),
                    },
                    icon: {
                        cursor: ''
                    }
                }
            }
        )
    }

    function menuTimes() {

        return select(
            {
                message: '',
                choices: [
                    { name: '      Registrar time', value: 'Registrar time' },
                    { name: '      Remover time', value: 'Remover time' },
                    { name: '      Voltar', value: 'Voltar' },
                ],
                theme: {
                    prefix: '',
                    style: {
                        help: () => '',
                        highlight: (choice) => colors.green('      ❯ ' + choice.trim()),
                    },
                    icon: {
                        cursor: ''
                    }
                }
            }
        )

    }

    function menuPartidas() {

        return select(
            {
                message: '',
                choices: [
                    { name: '      Registrar partida', value: 'Registrar partida' },
                    { name: '      Remover partida', value: 'Remover partida' },
                    { name: '      Voltar', value: 'Voltar' },
                ],
                theme: {
                    prefix: '',
                    style: {
                        help: () => '',
                        highlight: (choice) => colors.green('      ❯ ' + choice.trim()),
                    },
                    icon: {
                        cursor: ''
                    }
                }
            }
        )

    }

    function voltar() {

        return select(
            {
                message: '',
                choices: [
                    { name: '      Voltar', value: 'Voltar' },
                ],
                theme: {
                    prefix: '',
                    style: {
                        help: () => '',
                        highlight: (choice) => colors.green('      ❯ ' + choice.trim()),
                    },
                    icon: {
                        cursor: ''
                    }
                }
            }
        )

    }

    function mostrarTimes() {

        if (times.length <= 0) {
            print(`
        ╔═════════════════════╗ 
        ║    Não há times!    ║
        ╚═════════════════════╝
        `)
        } else {

            let largura = 0;

            for (const time of times) {
                const tamanho = time.nome.length
                if (tamanho > largura)
                    largura = tamanho
            }

            print(
                `
        ╔${'═'.repeat(largura + 11)}╗`)
            for (const index in times) {
                const time = times[index]
                print(`        ║    ${parseInt(index) + 1}. ${time.nome}${' '.repeat(largura - time.nome.length + 4)}║`)
            }
            print(`        ╚${'═'.repeat(largura + 11)}╝
        `)

        }
    }

    function mostrarPartidas() {

        print(`
        > (Venceu)
        < (Perdeu)
        = (Empate)`)

        if (partidas.length <= 0) {
            print(
                `
        ╔════════════════════════╗ 
        ║    Não há partidas!    ║
        ╚════════════════════════╝
        `)
        } else {

            let largura = 0;

            for (const partida of partidas) {

                const tamanho = partida.time1.nome.length + partida.time2.nome.length + 3

                if (tamanho > largura) {
                    largura = tamanho
                }

            }

            print(`        
        ╔${'═'.repeat(largura + 11)}╗`)
            for (const index in partidas) {
                const partida = partidas[index]
                const tamanho = partida.time1.nome.length + partida.time2.nome.length + 3
                print(`        ║    ${parseInt(index) + 1}. ${partida.time1.nome} ${partida.resultado === 'Empate' ? '=' : (partida.resultado === partida.time1 ? '>' : '<')} ${partida.time2.nome}${' '.repeat(largura - tamanho + 4)}║`)
            }
            print(`        ╚${'═'.repeat(largura + 11)}╝
        `)


        }
    }

    function mostrarRanking() {

        const ranking = []

        for (const time of times) {

            const pontos = time.vitorias * 3 + time.empates

            const dados = { time: time, pontos: pontos }

            ranking.push(dados)
        }

        ranking.sort((a, b) => b.pontos - a.pontos)

        print(`
        Vitória (+3 Pontos)
        Empate (+1 Ponto)
        Derrota (0 Ponto)`)

        if (ranking.length === 0) {
            print(`
        ╔═════════════════════╗ 
        ║    Não há times!    ║
        ╚═════════════════════╝
        `)
        } else {

            let largura = 0;

            for (const dados of ranking) {

                const tamanho = dados.time.nome.length + (dados.pontos.toString()).length + 10

                if (tamanho > largura) {
                    largura = tamanho
                }

            }

            if (largura < 17)
                largura = 17

            print(`        
        ╔${'═'.repeat(largura + 11)}╗`)
            for (const position in ranking) {
                const dados = ranking[position]

                print(`        ║    ${parseInt(position) + 1}. ${dados.time.nome} (${dados.pontos} Pontos)${' '.repeat(largura - (dados.time.nome.length + (dados.pontos.toString()).length + 10) + 4)}║
        ║    Total de partidas: ${dados.time.partidas}${' '.repeat(largura - (19 + (dados.time.partidas.toString()).length) + 7)}║
        ║    Vitórias: ${dados.time.vitorias}${' '.repeat(largura - (10 + (dados.time.vitorias.toString()).length) + 7)}║
        ║    Empates: ${dados.time.empates} ${' '.repeat(largura - (9 + (dados.time.vitorias.toString()).length) + 6)}║
        ║    Derrotas: ${dados.time.derrotas} ${' '.repeat(largura - (10 + (dados.time.derrotas.toString()).length) + 6)}║
        ║    Aproveitamento: ${dados.time.partidas > 0 ? parseInt((dados.time.vitorias / dados.time.partidas) * 100) : 0}% ${' '.repeat(largura - (16 + (dados.time.partidas > 0 ? parseInt((dados.time.vitorias / dados.time.partidas) * 100) : 0).toString().length + 1) + 6)}║`)

                if (parseInt(position) + 1 != ranking.length) {
                    print(`        ║${' '.repeat(largura + 11)}║`)
                }
            }
            print(`        ╚${'═'.repeat(largura + 11)}╝
        `)



        }

    }

    function digitarNome() {

        return input({
            message: '       Digite o nome (ou "Sair" para voltar):',
            validate: (value) => {
                value = value.trim().replace(/\s+/g, " ")
                if (value.length <= 0) {
                    return 'Por favor, insira um nome!';
                }
                if (times.find(time => time.nome.toLowerCase() === value.toLowerCase())) {
                    return 'Time já registrado!';
                }
                if (value.length > 50) {
                    return 'Esse nome é muito grande!';
                }
                return true;
            },
            theme: {
                prefix: '',
                style: {
                    help: () => '',
                    message: (message) => colors.reset(message),
                    error: (error) => colors.red('        ❯ ' + error),
                },
            }
        })
    }

    function escolherTime(mensagem, excluido) {

        print(`

        ${mensagem || 'Times:'}`)

        const timesFiltrados = times.filter((_, index) => index !== parseInt(excluido));

        if (timesFiltrados.length <= 0) {

            print(
                `
        ╔═════════════════════╗ 
        ║    Não há times!    ║`
            )

            return select(
                {
                    message: '',
                    choices: [
                        { name: '        ║    Voltar           ║', value: 'Voltar', description: '        ╚═════════════════════╝' },
                    ],
                    theme: {
                        prefix: `        ║    ${' '.repeat(17)}║`,
                        style: {
                            help: () => '',
                            highlight: (choice) => '        ║  ' + colors.green('❯ ' + choice.trim().substring(5, choice.trim().length - 1)) + '║',
                            description: (description) => colors.reset(description)
                        },
                        icon: {
                            cursor: ''
                        },
                    }
                }
            )

        } else {

            let largura = 0;

            for (const time of timesFiltrados) {
                const tamanho = time.nome.length
                if (tamanho > largura)
                    largura = tamanho
            }

            if (largura < 2)
                largura = 2

            let escolhas = []

            for (const index in timesFiltrados) {

                const time = timesFiltrados[index]

                escolhas.push({ name: `      ║    ${parseInt(index) + 1}. ${time.nome}${' '.repeat(largura - time.nome.length + 5)}║`, value: times.indexOf(time), description: `        ╚${'═'.repeat(largura + 12)}╝` })

            }

            escolhas.push(
                new separator(`       ║${' '.repeat(largura + 12)}║`),
                { name: `      ║    Voltar${' '.repeat(largura + 2)}║`, value: 'Voltar', description: `        ╚${'═'.repeat(largura + 12)}╝` },
            )

            return select(
                {
                    message: `
        ╔${'═'.repeat(largura + 12)}╗`,
                    choices: escolhas,
                    theme: {
                        prefix: '',
                        style: {
                            help: () => '',
                            highlight: (choice) => '        ║  ' + colors.green('❯ ' + choice.trim().substring(5, choice.trim().length - 1)) + '║',
                            description: (description) => colors.reset(description)
                        },
                        icon: {
                            cursor: ''
                        },
                    }
                }
            )
        }
    }

    function escolherPartida(mensagem) {

        print(`
        > (Venceu)
        < (Perdeu)
        = (Empate)`)

        print(`

        ${mensagem || 'Partidas:'}`)

        if (partidas.length <= 0) {

            print(
                `
        ╔════════════════════════╗ 
        ║    Não há partidas!    ║`
            )

            return select(
                {
                    message: '',
                    choices: [
                        { name: '        ║    Voltar              ║', value: 'Voltar', description: '        ╚════════════════════════╝' },
                    ],
                    theme: {
                        prefix: `        ║    ${' '.repeat(20)}║`,
                        style: {
                            help: () => '',
                            highlight: (choice) => '        ║  ' + colors.green('❯ ' + choice.trim().substring(5, choice.trim().length - 1)) + '║',
                            description: (description) => colors.reset(description)
                        },
                        icon: {
                            cursor: ''
                        },
                    }
                }
            )

        } else {

            let largura = 0;

            for (const partida of partidas) {

                const tamanho = partida.time1.nome.length + partida.time2.nome.length + 2

                if (tamanho > largura) {
                    largura = tamanho
                }

            }

            if (largura < 2)
                largura = 2

            let escolhas = []

            for (const index in partidas) {

                const partida = partidas[index]

                escolhas.push({ name: `      ║    ${parseInt(index) + 1}. ${partida.time1.nome} ${partida.resultado === 'Empate' ? '=' : (partida.resultado === partida.time1 ? '>' : '<')} ${partida.time2.nome}${' '.repeat(largura - (partida.time1.nome.length + partida.time2.nome.length + 3) + 5)}║`, value: index, description: `        ╚${'═'.repeat(largura + 12)}╝` })

            }

            escolhas.push(
                new separator(`       ║${' '.repeat(largura + 12)}║`),
                { name: `      ║    Voltar${' '.repeat(largura + 2)}║`, value: 'Voltar', description: `        ╚${'═'.repeat(largura + 12)}╝` },
            )

            return select(
                {
                    message: `
        ╔${'═'.repeat(largura + 12)}╗`,
                    choices: escolhas,
                    theme: {
                        prefix: '',
                        style: {
                            help: () => '',
                            highlight: (choice) => '        ║  ' + colors.green('❯ ' + choice.trim().substring(5, choice.trim().length - 1)) + '║',
                            description: (description) => colors.reset(description)
                        },
                        icon: {
                            cursor: ''
                        },
                    }
                }
            )
        }

    }

    function escolherResultado(index1, index2) {

        print(`
            
        Escolha o time vencedor da partida:
            `)

        const time1 = times[index1]
        const time2 = times[index2]

        let largura = time1.nome.length > time2.nome.length ? time1.nome.length : time2.nome.length

        if (largura < 6)
            largura = 6

        return select(

            {
                message: `        ╔${'═'.repeat(largura + 8)}╗`,
                choices: [
                    { name: `      ║    ${time1.nome}${' '.repeat(largura - time1.nome.length + 4)}║`, value: time1, description: `        ╚${'═'.repeat(largura + 8)}╝` },
                    { name: `      ║    ${time2.nome}${' '.repeat(largura - time2.nome.length + 4)}║`, value: time2, description: `        ╚${'═'.repeat(largura + 8)}╝` },
                    new separator(`       ║${' '.repeat(largura + 8)}║`),
                    { name: `      ║    Empate${' '.repeat(largura - 2)}║`, value: 'Empate', description: `        ╚${'═'.repeat(largura + 8)}╝` },
                    new separator(`       ║${' '.repeat(largura + 8)}║`),
                    { name: `      ║    Voltar${' '.repeat(largura - 2)}║`, value: 'Voltar', description: `        ╚${'═'.repeat(largura + 8)}╝` },
                ],
                theme: {
                    prefix: '',
                    style: {
                        help: () => '',
                        highlight: (choice) => '        ║  ' + colors.green('❯ ' + choice.trim().substring(5, choice.trim().length - 1)) + '║',
                        description: (description) => colors.reset(description)
                    },
                    icon: {
                        cursor: ''
                    },
                }
            }
        )
    }

    while (true) {

        clear()

        print(`
            
        ╔═════════════════════════════════════════════════════════════╗
        ║    Bem-vindo ao sistema de ranking de League of Legends!    ║
        ╚═════════════════════════════════════════════════════════════╝

                       Escolha uma das opções abaixo:                  
                          ↑ ↓ para mover o cursor 
                          ↵ (Enter) para confirmar
        `)

        const escolha = await menuPrincipal()

        /*
            Times
            Partidas
            Ranking
            Sair
        */

        clear()

        if (escolha === 'Times') {

            const titulo = `
            
        ╔═════════════════════════════════════════════════════════════╗
        ║                            Times                            ║
        ╚═════════════════════════════════════════════════════════════╝`

            while (true) {

                clear()

                print(titulo)

                mostrarTimes()

                const escolhaTimes = await menuTimes()

                if (escolhaTimes === 'Voltar')
                    break

                if (escolhaTimes === 'Registrar time') {

                    while (true) {

                        clear()

                        print(titulo)

                        mostrarTimes()

                        print('')

                        const nome = (await digitarNome()).trim().replace(/\s+/g, " ");

                        if (nome.toLowerCase() === 'sair')
                            break

                        times.push(
                            {
                                nome: nome,
                                partidas: 0,
                                vitorias: 0,
                                derrotas: 0,
                                empates: 0
                            }
                        )
                    }
                }

                if (escolhaTimes === 'Remover time') {

                    while (true) {

                        clear()

                        print(titulo)

                        const timeRemovido = await escolherTime('Escolha um time para remover:')

                        if (timeRemovido === 'Voltar')
                            break

                        times.splice(timeRemovido, 1)

                    }
                }

            }
        }

        if (escolha === 'Partidas') {

            const titulo = `
            
        ╔═════════════════════════════════════════════════════════════╗
        ║                          Partidas                           ║
        ╚═════════════════════════════════════════════════════════════╝`

            while (true) {

                clear()

                print(titulo)

                mostrarPartidas()

                const escolhaPartidas = await menuPartidas()

                if (escolhaPartidas === 'Voltar')
                    break

                if (escolhaPartidas === 'Registrar partida') {

                    while (true) {

                        clear()

                        print(titulo)

                        const indexTime1 = await escolherTime('Escolha o time 1:')

                        if (indexTime1 === 'Voltar')
                            break

                        clear()

                        print(titulo)

                        const indexTime2 = await escolherTime('Escolha o time 2:', indexTime1)

                        if (indexTime2 === 'Voltar')
                            break

                        clear()

                        print(titulo)

                        const resultado = await escolherResultado(indexTime1, indexTime2)

                        if (resultado === 'Voltar')
                            break

                        const time1 = times[indexTime1]
                        const time2 = times[indexTime2]

                        partidas.push(
                            {
                                time1: time1,
                                time2: time2,
                                resultado: resultado
                            }
                        )

                        time1.partidas++
                        time2.partidas++

                        if (resultado === time1) {
                            time1.vitorias++
                            time2.derrotas++
                        } else if (resultado === time2) {
                            time1.derrotas++
                            time2.vitorias++
                        } else {
                            time1.empates++
                            time2.empates++
                        }

                        break

                    }
                }

                if (escolhaPartidas === 'Remover partida') {

                    while (true) {

                        clear()

                        print(titulo)

                        const indexPartidaRemovida = await escolherPartida('Escolha uma partida para remover:')

                        if (indexPartidaRemovida === 'Voltar')
                            break

                        const partidaRemovida = partidas[indexPartidaRemovida]

                        partidaRemovida.time1.partidas--
                        partidaRemovida.time2.partidas--

                        if (partidaRemovida.resultado === partidaRemovida.time1) {
                            partidaRemovida.time1.vitorias--
                            partidaRemovida.time2.derrotas--
                        } else if (partidaRemovida.resultado === partidaRemovida.time2) {
                            partidaRemovida.time1.derrotas--
                            partidaRemovida.time2.vitorias--
                        } else {
                            partidaRemovida.time1.empates--
                            partidaRemovida.time2.empates--
                        }

                        partidas.splice(indexPartidaRemovida, 1)

                    }
                }

            }

        }

        if (escolha === 'Ranking') {

            const titulo = `
            
        ╔═════════════════════════════════════════════════════════════╗
        ║                           Ranking                           ║
        ╚═════════════════════════════════════════════════════════════╝`

            while (true) {

                clear()

                print(titulo)

                mostrarRanking()

                await voltar()

                break

            }

        }

        if (escolha === 'Sair') {
            break
        }
    }

}

main()