// API - NIRVANA //

const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Private-Network", "true");
  res.header("Access-Control-Allow-Private-Network", "true");
  res.header(
    "Access-Control-Request-Private-Network",
    "Access-Control-Allow-Private-Network",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "API Node.js + Express + Postgres API - NIRVANA (PBH)",
  });
});

app.listen(port, () => {
  console.log("API NIRVANA rodando na porta " + port);
});

// PGPASSWORD=Mm1VT7rskK0oeRn0qtlp psql -h containers-us-west-128.railway.app -U postgres -p 6017 -d railway

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "roundhouse.proxy.rlwy.net",
  database: "railway",
  password: "zBudHKTQmqvHBqkMGYihrAySHVRvSoWo",
  port: 32529,
});

// ENDPOINTS //

// USUÁRIOS (LOGIN).
app.post("/checkusuario", (req, res) => {
  const {
    usuario,
    senha
  } = req.body;
  var sql = "SELECT * FROM usuarios WHERE usuario = $1 AND senha = $2";
  pool.query(sql, [usuario, senha], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// listar usuários.
app.get("/list_usuarios", (req, res) => {
  var sql = "SELECT * FROM usuarios";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir usuario.
app.post("/insert_usuario", (req, res) => {
  const {
    nome,
    contato,
    tipo,
    usuario,
    senha,
    upa_vn,
    upa_pampulha,
    upa_norte,
    upa_nordeste,
    upa_barreiro
  } = req.body;
  var sql = "INSERT INTO usuarios (nome, contato, tipo, usuario, senha, upa_vn, upa_pampulha, upa_norte, upa_nordeste, upa_barreiro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
  pool.query(sql, [
    nome,
    contato,
    tipo,
    usuario,
    senha,
    upa_vn,
    upa_pampulha,
    upa_norte,
    upa_nordeste,
    upa_barreiro
  ], (error, results) => {
    if (error) throw new Error(req.body.idpct + 'ERRO: ' + error);
    res.send(results);
  });
});

// atualizar usuario.
app.post("/update_usuario/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    nome,
    contato,
    tipo,
    usuario,
    senha,
    upa_vn,
    upa_pampulha,
    upa_norte,
    upa_nordeste,
    upa_barreiro
  } = req.body;
  var sql = "UPDATE usuarios SET nome = $1, contato = $2, tipo = $3, usuario = $4, senha = $5, upa_vn = $6, upa_pampulha = $7, upa_norte = $8, upa_nordeste = $9, upa_barreiro = $10 WHERE id = $11";
  pool.query(sql, [
    nome,
    contato,
    tipo,
    usuario,
    senha,
    upa_vn,
    upa_pampulha,
    upa_norte,
    upa_nordeste,
    upa_barreiro,
    id
  ], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir usuario.
app.get("/delete_usuario/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM usuarios WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// PACIENTES.
// listar todos os pacientes internados.
app.get("/list_pacientes", (req, res) => {
  var sql = "SELECT * FROM pacientes WHERE TO_TIMESTAMP(passometro_data, 'DD/MM/YYYY - HH24:MI') > NOW() - INTERVAL '30 days'";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir paciente internado.
app.post("/insert_paciente", (req, res) => {
  const {
    aih,
    procedimento,
    unidade_origem,
    setor_origem,
    nome_paciente,
    nome_mae,
    dn_paciente,
    status,
    unidade_destino,
    setor_destino,
    indicador_data_cadastro,
    indicador_data_confirmacao,
    indicador_relatorio,
    indicador_solicitacao_transporte,
    indicador_saida_origem,
    indicador_chegada_destino,
    dados_susfacil,
    exames_ok,
    aih_ok,
    glasgow,
    pas,
    pad,
    fc,
    fr,
    sao2,
    ofertao2,
    tipo_leito,
    contato_nome,
    contato_telefone,
    leito_destino,
    passometro_leito,
    passometro_situacao,
    passometro_breve_historico,
    passometro_avaliacao,
    passometro_recomendacao,
    passometro_peso,
    passometro_notificacao_srag,
    passometro_notificacao_dengue,
    passometro_checklist_teste_covid,
    passometro_checklist_teste_dengue,
    passometro_checklist_evolucao,
    passometro_checklist_prescricao,
    passometro_checklist_laboratorio,
    passometro_checklist_rx,
    passometro_setor,
    passometro_data,
    passometro_vulnerabilidade,
    passometro_cersam,
    tag,
  } = req.body;
  var sql = "INSERT INTO pacientes (aih, procedimento, unidade_origem, setor_origem, nome_paciente, nome_mae, dn_paciente, status, unidade_destino, setor_destino, indicador_data_cadastro, indicador_data_confirmacao, indicador_relatorio, indicador_solicitacao_transporte, indicador_saida_origem, indicador_chegada_destino, dados_susfacil, exames_ok, aih_ok, glasgow, pas, pad, fc, fr, sao2, ofertao2, tipo_leito, contato_nome, contato_telefone, leito_destino, passometro_leito, passometro_situacao, passometro_breve_historico, passometro_avaliacao, passometro_recomendacao, passometro_peso, passometro_notificacao_srag, passometro_notificacao_dengue, passometro_checklist_teste_covid, passometro_checklist_teste_dengue, passometro_checklist_evolucao, passometro_checklist_prescricao, passometro_checklist_laboratorio, passometro_checklist_rx, passometro_setor, passometro_data, passometro_vulnerabilidade, passometro_cersam, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49)"
  pool.query(sql, [
    aih,
    procedimento,
    unidade_origem,
    setor_origem,
    nome_paciente,
    nome_mae,
    dn_paciente,
    status,
    unidade_destino,
    setor_destino,
    indicador_data_cadastro,
    indicador_data_confirmacao,
    indicador_relatorio,
    indicador_solicitacao_transporte,
    indicador_saida_origem,
    indicador_chegada_destino,
    dados_susfacil,
    exames_ok,
    aih_ok,
    glasgow,
    pas,
    pad,
    fc,
    fr,
    sao2,
    ofertao2,
    tipo_leito,
    contato_nome,
    contato_telefone,
    leito_destino,
    passometro_leito,
    passometro_situacao,
    passometro_breve_historico,
    passometro_avaliacao,
    passometro_recomendacao,
    passometro_peso,
    passometro_notificacao_srag,
    passometro_notificacao_dengue,
    passometro_checklist_teste_covid,
    passometro_checklist_teste_dengue,
    passometro_checklist_evolucao,
    passometro_checklist_prescricao,
    passometro_checklist_laboratorio,
    passometro_checklist_rx,
    passometro_setor,
    passometro_data,
    passometro_vulnerabilidade,
    passometro_cersam,
    tag,
  ], (error, results) => {
    if (error) throw new Error(req.body.idpct + 'ERRO: ' + error);
    res.send(results);
  });
});

// atualizar paciente.
app.post("/update_paciente/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    aih,
    procedimento,
    unidade_origem,
    setor_origem,
    nome_paciente,
    nome_mae,
    dn_paciente,
    status,
    unidade_destino,
    setor_destino,
    indicador_data_cadastro,
    indicador_data_confirmacao,
    indicador_relatorio,
    indicador_solicitacao_transporte,
    indicador_saida_origem,
    indicador_chegada_destino,
    dados_susfacil,
    exames_ok,
    aih_ok,
    glasgow,
    pas,
    pad,
    fc,
    fr,
    sao2,
    ofertao2,
    tipo_leito,
    contato_nome,
    contato_telefone,
    leito_destino,
    passometro_leito,
    passometro_situacao,
    passometro_breve_historico,
    passometro_avaliacao,
    passometro_recomendacao,
    passometro_peso,
    passometro_notificacao_srag,
    passometro_notificacao_dengue,
    passometro_checklist_teste_covid,
    passometro_checklist_teste_dengue,
    passometro_checklist_evolucao,
    passometro_checklist_prescricao,
    passometro_checklist_laboratorio,
    passometro_checklist_rx,
    passometro_setor,
    passometro_data,
    passometro_vulnerabilidade,
    passometro_cersam,
    tag,
  } = req.body;
  var sql = "UPDATE pacientes SET aih = $1, procedimento = $2, unidade_origem = $3, setor_origem = $4, nome_paciente = $5, nome_mae = $6, dn_paciente = $7, status = $8, unidade_destino = $9, setor_destino = $10, indicador_data_cadastro = $11, indicador_data_confirmacao = $12, indicador_relatorio = $13, indicador_solicitacao_transporte = $14, indicador_saida_origem = $15, indicador_chegada_destino = $16, dados_susfacil = $17, exames_ok = $18, aih_ok = $19, glasgow = $20, pas = $21, pad = $22, fc = $23, fr = $24, sao2 = $25, ofertao2 = $26, tipo_leito = $27, contato_nome = $28, contato_telefone = $29, leito_destino = $30, passometro_leito = $31, passometro_situacao = $32, passometro_breve_historico = $33, passometro_avaliacao = $34, passometro_recomendacao = $35, passometro_peso = $36, passometro_notificacao_srag = $37, passometro_notificacao_dengue = $38, passometro_checklist_teste_covid = $39, passometro_checklist_teste_dengue = $40, passometro_checklist_evolucao = $41, passometro_checklist_prescricao = $42, passometro_checklist_laboratorio = $43, passometro_checklist_rx = $44, passometro_setor = $45, passometro_data = $46, passometro_vulnerabilidade = $47, passometro_cersam = $48, tag = $49 WHERE id = $50";
  pool.query(sql, [
    aih,
    procedimento,
    unidade_origem,
    setor_origem,
    nome_paciente,
    nome_mae,
    dn_paciente,
    status,
    unidade_destino,
    setor_destino,
    indicador_data_cadastro,
    indicador_data_confirmacao,
    indicador_relatorio,
    indicador_solicitacao_transporte,
    indicador_saida_origem,
    indicador_chegada_destino,
    dados_susfacil,
    exames_ok,
    aih_ok,
    glasgow,
    pas,
    pad,
    fc,
    fr,
    sao2,
    ofertao2,
    tipo_leito,
    contato_nome,
    contato_telefone,
    leito_destino,
    passometro_leito,
    passometro_situacao,
    passometro_breve_historico,
    passometro_avaliacao,
    passometro_recomendacao,
    passometro_peso,
    passometro_notificacao_srag,
    passometro_notificacao_dengue,
    passometro_checklist_teste_covid,
    passometro_checklist_teste_dengue,
    passometro_checklist_evolucao,
    passometro_checklist_prescricao,
    passometro_checklist_laboratorio,
    passometro_checklist_rx,
    passometro_setor,
    passometro_data,
    passometro_vulnerabilidade,
    passometro_cersam,
    tag,
    id
  ], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir paciente.
app.get("/delete_paciente/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM pacientes WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// TRANSPORTES.
// listar todos os transportes.
app.get("/list_transportes", (req, res) => {
  var sql = "SELECT * FROM transportes";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir transporte.
app.post("/insert_transporte", (req, res) => {
  const {
    aih,
    protocolo,
    id_ambulancia,
    finalidade,
    data_pedido,
    unidade_destino,
    setor_destino,
    status,
    justificativa_recusa
  } = req.body;
  var sql = "INSERT INTO transportes (aih, protocolo, id_ambulancia, finalidade, data_pedido, unidade_destino, setor_destino, status, justificativa_recusa) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
  pool.query(sql, [
    aih,
    protocolo,
    id_ambulancia,
    finalidade,
    data_pedido,
    unidade_destino,
    setor_destino,
    status,
    justificativa_recusa
  ], (error, results) => {
    if (error) throw new Error(req.body.idpct + 'ERRO: ' + error);
    res.send(results);
  });
});

// atualizar transporte.
app.post("/update_transporte/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    aih,
    protocolo,
    id_ambulancia,
    finalidade,
    data_pedido,
    unidade_destino,
    setor_destino,
    status,
    justificativa_recusa
  } = req.body;
  var sql = "UPDATE transportes SET aih = $1, protocolo = $2, id_ambulancia = $3, finalidade = $4, data_pedido = $5, unidade_destino = $6, setor_destino = $7, status = $8, justificativa_recusa = $9 WHERE id = $10";
  pool.query(sql, [
    aih,
    protocolo,
    id_ambulancia,
    finalidade,
    data_pedido,
    unidade_destino,
    setor_destino,
    status,
    justificativa_recusa,
    id
  ], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir transporte.
app.get("/delete_transporte/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM transportes WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// UNIDADES DE SAÚDE
// listar unidades de saúde.
app.get("/list_unidades", (req, res) => {
  var sql = "SELECT * FROM unidades";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir unidade de saúde.
app.post("/insert_unidade", (req, res) => {
  const {
    unidade,
    endereco,
    telefone
  } = req.body;
  var sql = "INSERT INTO unidades (unidade, endereco, telefone) VALUES ($1, $2, $3)"
  pool.query(sql, [
    unidade,
    endereco,
    telefone
  ], (error, results) => {
    if (error) throw new Error(req.body.idpct + 'ERRO: ' + error);
    res.send(results);
  });
});

// atualizar unidade.
app.post("/update_unidade/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    unidade,
    endereco,
    telefone
  } = req.body;
  var sql = "UPDATE unidades SET unidade = $1, endereco = $2, telefone = $3 WHERE id = $4";
  pool.query(sql, [
    unidade,
    endereco,
    telefone,
    id
  ], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir unidade.
app.get("/delete_unidade/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM unidades WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// AMBULÂNCIAS (TS)
// listar ambulancias.
app.get("/list_ambulancias", (req, res) => {
  var sql = "SELECT * FROM ambulancias";
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// inserir ambulancia.
app.post("/insert_ambulancia", (req, res) => {
  const {
    codigo,
    motorista,
    status
  } = req.body;
  var sql = "INSERT INTO ambulancias (codigo, motorista, status) VALUES ($1, $2, $3)"
  pool.query(sql, [
    codigo,
    motorista,
    status
  ], (error, results) => {
    if (error) throw new Error(req.body.idpct + 'ERRO: ' + error);
    res.send(results);
  });
});

// atualizar ambulancia.
app.post("/update_ambulancia/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    codigo,
    motorista,
    status
  } = req.body;
  var sql = "UPDATE ambulancias SET codigo = $1, motorista = $2, status = $3 WHERE id = $4";
  pool.query(sql, [
    codigo,
    motorista,
    status,
    id
  ], (error, results) => {
    if (error) throw new Error(error);
    res.send(results);
  });
});

// excluir ambulancia.
app.get("/delete_ambulancia/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  var sql = "DELETE FROM ambulancias WHERE id = $1";
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});