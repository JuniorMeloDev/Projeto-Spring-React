package br.com.api.produtos.modelo;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component //Essa anottations instancia o objeto automaticamente
@Getter
@Setter
public class RespostaModelo {

    private String mensagem;
    
}
