import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository
{
    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarnoArray(numero);

        if (buscaConta != null)
        {
            buscaConta.visualizar();
        }
        else
        {
            console.log (colors.fg.redstrong, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
        }
    }
    listarTodas(): void {
        for (let conta of this.listaContas)
        {
            conta.visualizar();
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.whitestrong, "\nA Conta número: " + conta.numero + " foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarnoArray(conta.numero);

        if (buscaConta != null)
        {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.greenstrong, "\nA conta número: " + conta.numero + " foi atualizada com sucesso!", colors.reset);
        }
        else
        {
            console.log(colors.fg.redstrong, "\nA conta número: " + conta.numero + " não foi encontrada!", colors.reset);
        }
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarnoArray(numero);

        if(buscaConta != null)
        {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.greenstrong, "\nA conta número: " + numero + " foi apagada com sucesos!", colors.reset);
        }
        else
        {
            console.log(colors.fg.redstrong, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
        }
    }
    sacar(numero: number, valor: number): void {
        let conta = this.buscarnoArray(numero);

        if (conta != null)
        {
            if(conta.sacar(valor) == true)
            {
                console.log(colors.fg.greenstrong, `\nO saque na conta número: ${numero} foi efetuado com sucesso`, colors.reset);
            }
        }
        else{
            console.log(colors.fg.redstrong, `\nA conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }
    depositar(numero: number, valor: number): void {
        let conta = this.buscarnoArray(numero);

        if (conta != null)
        {
            conta.depositar(valor);
            console.log(colors.fg.greenstrong, `\nO depósito na conta número: ${numero} foi efetuado com sucesso`, colors.reset);
        }
        else
        {
            console.log(colors.fg.redstrong, `\nA conta número ${numero} não foi encontrada!`, colors.reset);
        }
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarnoArray(numeroOrigem);
        let contaDestino = this.buscarnoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null)
        {
            if(contaOrigem.sacar(valor) == true)
            {
                contaDestino.depositar(valor);
                console.log(colors.fg.greenstrong, `\n A transferência da conta número: ${numeroOrigem} para a conta número: ${numeroDestino} foi efetuada com sucesso`, colors.reset);
            }
        }
        else
        {
            console.log(colors.fg.redstrong,`\nA conta número: ${numeroOrigem} e/ou a conta número: ${numeroDestino} não foram encontradas!`, colors.reset);
        }
    }
    
    //GERAR NÚMERO DA CONTA
    public gerarNumero(): number 
    {
        return ++ this.numero;
    }

    //VERIFICA SE A CONTA EXISTE
    public buscarnoArray(numero: number): Conta | null 
    {
        for (let conta of this.listaContas)
        {
            if (conta.numero === numero)
                return conta;
        }
        return null;
    }
}