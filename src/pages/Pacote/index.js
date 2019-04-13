import React, { Component } from "react";
import api from "../../services/api";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";

import { MdAddBox } from "react-icons/md";

import "./styles.css";

export default class Pacote extends Component {
  state = {
    pacote: {},
    local: "",
    tipo: ""
  };

  async componentDidMount() {
    const response = await api.get(`pacote/${this.props.match.params.codigo}`);

    this.setState({
      pacote: response.data
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post(
      `pacote/${this.state.pacote.codigo}/atualizacao`,
      {
        local: this.state.local,
        tipo: this.state.tipo
      }
    );

    this.setState({
      tipo: "",
      local: "",
      pacote: {
        ...this.state.pacote,
        atualizacoes: [...this.state.pacote.atualizacoes, response.data]
      }
    });
  };

  handleInputChange = () => {};

  render() {
    return (
      <div id="box-container">
        <header>
          <span className="logo"><a href="/">Rastreamento</a></span>
          <h1>{this.state.pacote.codigo}</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Local atual"
            value={this.state.local}
            onChange={e => {
              this.setState({ local: e.target.value });
            }}
          />
          <input
            className="ml10"
            placeholder="Tipo de atualização"
            value={this.state.tipo}
            onChange={e => {
              this.setState({ tipo: e.target.value });
            }}
          />
          <button className="ml10" type="submit">
            Salvar
          </button>
        </form>

        <ul>
          {this.state.pacote.atualizacoes &&
            this.state.pacote.atualizacoes.map(atualizacao => (
              <li key={atualizacao._id}>
                <strong>{atualizacao.local}</strong>
                <div className="grupo-detalhes">
                  <span>{atualizacao.tipo}</span>
                  <span>
                    há{" "}
                    {distanceInWords(atualizacao.createdAt, new Date(), {
                      locale: pt
                    })}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
