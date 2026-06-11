#!/usr/bin/env bash
set -euo pipefail

WP_CLI_BIN="${WP_CLI_BIN:-wp}"
WP_CLI_ARGS="${WP_CLI_ARGS:-}"
SITE_TITLE="${SEED_SITE_TITLE:-Congresso Brasileiro de Atualizacao Cientifica 2026}"
SITE_TAGLINE="${SEED_SITE_TAGLINE:-Conhecimento, inovacao e conexoes para profissionais de saude}"
MENU_NAME="${SEED_PRIMARY_MENU_NAME:-Menu Principal Congresso}"
FOOTER_MENU_NAME="${SEED_FOOTER_MENU_NAME:-Menu Rodape Congresso}"

declare -a WP_CLI_EXTRA_ARGS=()
if [[ -n "${WP_CLI_ARGS}" ]]; then
  read -r -a WP_CLI_EXTRA_ARGS <<< "${WP_CLI_ARGS}"
fi

wp_cmd() {
  "${WP_CLI_BIN}" "${WP_CLI_EXTRA_ARGS[@]}" "$@"
}

ensure_wp() {
  if ! command -v "${WP_CLI_BIN}" >/dev/null 2>&1; then
    echo "Erro: comando '${WP_CLI_BIN}' nao encontrado."
    echo "Defina WP_CLI_BIN com o caminho correto ou execute em ambiente com WP-CLI."
    exit 1
  fi

  wp_cmd core is-installed >/dev/null 2>&1 || {
    echo "Erro: WordPress nao instalado no ambiente atual do WP-CLI."
    exit 1
  }
}

page_markup() {
  local slug="$1"

  case "$slug" in
    home)
      cat <<'HTML'
<!-- wp:cover {"url":"https://picsum.photos/seed/banner-home-congresso/1600/620","dimRatio":35,"minHeight":420,"minHeightUnit":"px","isDark":false,"style":{"spacing":{"padding":{"top":"90px","bottom":"90px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover is-light" style="padding-top:90px;padding-right:40px;padding-bottom:90px;padding-left:40px;min-height:420px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-35 has-background-dim"></span><img class="wp-block-cover__image-background" alt="Banner do congresso" src="https://picsum.photos/seed/banner-home-congresso/1600/620" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"46px","lineHeight":"1.15"}}} -->
<h1 style="font-size:46px;line-height:1.15">Congresso Nacional de Atualizacao em Saude e Ciencia</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"large"} -->
<p class="has-large-font-size">Tres dias de conteudo pratico, discussoes cientificas e networking com especialistas do Brasil inteiro.</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:cover -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>Data e Local</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>20 a 22 de agosto de 2026, no Centro de Convencoes Frei Caneca, Sao Paulo.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>Publico-alvo</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Medicos, residentes, pesquisadores, academicos e profissionais multidisciplinares.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>Formato</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Programacao presencial com transmissoes especiais e acesso posterior ao conteudo selecionado.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
HTML
      ;;
    congresso)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-congresso/1400/540" alt="Sobre o congresso"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>O congresso</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>O Congresso Nacional de Atualizacao em Saude e Ciencia e um encontro anual que conecta ensino, pesquisa e pratica clinica. O objetivo e acelerar a traducao da ciencia para a rotina assistencial, com foco em qualidade de cuidado e seguranca do paciente.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Nesta edicao, reunimos paines integrados por especialidade, oficinas de tomada de decisao, apresentacao de estudos multicentricos e mesas de inovacao digital com aplicacao direta nos servicos de saude.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Corpo docente com especialistas nacionais e internacionais</li><li>Trilhas cientificas por nivel de aprofundamento</li><li>Ambientes para networking e parcerias institucionais</li><li>Certificado com carga horaria validada</li></ul>
<!-- /wp:list -->
HTML
      ;;
    inscricoes)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-inscricoes/1400/540" alt="Inscricoes"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Inscricoes e lotes</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>As inscricoes estao organizadas em lotes progressivos para medicos, residentes, academicos e equipes multidisciplinares. O pagamento pode ser realizado via cartao ou boleto, com confirmacao automatica no sistema.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Categoria</th><th>1o Lote</th><th>2o Lote</th><th>Ultimo Lote</th></tr></thead><tbody><tr><td>Medicos</td><td>R$ 790</td><td>R$ 940</td><td>R$ 1.090</td></tr><tr><td>Residentes</td><td>R$ 420</td><td>R$ 520</td><td>R$ 620</td></tr><tr><td>Academicos</td><td>R$ 280</td><td>R$ 340</td><td>R$ 420</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Grupos com 10 ou mais participantes podem solicitar condicoes especiais para inscricao institucional.</p>
<!-- /wp:paragraph -->
HTML
      ;;
    palestrantes)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-palestrantes/1400/540" alt="Palestrantes convidados"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Palestrantes convidados</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Inspirado no formato de listagem por especialistas, esta edicao conta com convidados de diferentes estados para ampliar repertorio clinico e cientifico.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Dra. Camila Teixeira Valadares - MG - Endocrinologia Clinica</li>
<li>Dr. Rafael Nogueira Campos - SP - Cirurgia Metabolica</li>
<li>Dra. Luana Barbosa Mendonca - RJ - Endocrinologia Pediatrica</li>
<li>Dr. Thiago Araujo Rezende - PR - Medicina Interna e Obesidade</li>
<li>Dra. Fernanda Costa Almeida - BA - Nutrologia Clinica</li>
<li>Dr. Andre Vinicius Guimaraes - DF - Epidemiologia e Dados em Saude</li>
<li>Dra. Gabriela Ramos Souza - RS - Metabolismo e Atividade Fisica</li>
<li>Dr. Bruno Furtado Pires - PE - Telemedicina e Jornada do Paciente</li>
<li>Dra. Natalia Siqueira Lopes - CE - Tireoide e Nodulos</li>
<li>Dr. Pedro Henrique Martins - MG - Pesquisa Translacional</li>
</ul>
<!-- /wp:list -->
HTML
      ;;
    programacao)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-programacao/1400/540" alt="Programacao"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Programacao cientifica</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A agenda foi estruturada para equilibrar atualizacao de evidencias, discussao de casos e aplicacao pratica em diferentes cenarios de atendimento.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Dia 1 - Atualizacao e Diretrizes</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><li>08h00 - Credenciamento e abertura</li><li>09h00 - Conferencia magna: tendencias 2026</li><li>11h00 - Mesa interdisciplinar: condutas de primeira linha</li><li>14h00 - Simposios satelite e paineis tematicos</li><li>17h30 - Sessao de perguntas e respostas</li></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Dia 2 - Casos e inovacao</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><li>08h30 - Casos comentados por banca especialista</li><li>11h00 - Inteligencia artificial no apoio a decisao</li><li>14h30 - Oficinas praticas por trilha</li><li>17h00 - Debate: protocolos e seguranca clinica</li></ul>
<!-- /wp:list -->
HTML
      ;;
    trabalhos)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-trabalhos/1400/540" alt="Submissao de trabalhos"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Submissao de trabalhos cientificos</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Pesquisadores e residentes podem submeter resumos para avaliacao da comissao cientifica. Os melhores trabalhos serao selecionados para apresentacao oral e sessao de poster comentado.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Prazo para submissao: 30/06/2026</li><li>Resultado preliminar: 25/07/2026</li><li>Versao final para anais: 05/08/2026</li><li>Categorias: clinica, translacional, educacao medica, tecnologia em saude</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Envie seu resumo com titulo estruturado, objetivos, metodologia, resultados e conclusao.</p>
<!-- /wp:paragraph -->
HTML
      ;;
    agencia-de-turismo)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-turismo/1400/540" alt="Agencia de turismo oficial"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Agencia de turismo oficial</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A agencia parceira disponibiliza condicoes especiais para passagens, hospedagem e transfer durante o congresso, com atendimento dedicado para participantes e palestrantes.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>Hospedagem</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hoteis conveniados com tarifa corporativa a ate 15 minutos do evento.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>Transfer</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Traslado aeroporto-hotel-centro de convencoes com horarios programados.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>Contato rapido</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>WhatsApp: (11) 98888-2026<br>E-mail: viagens@congressosaude.com.br</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
HTML
      ;;
    fale-conosco)
      cat <<'HTML'
<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/banner-contato/1400/540" alt="Fale conosco"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Fale Conosco</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Nossa secretaria executiva atende duvidas sobre inscricao, submissao de trabalhos, credenciamento de imprensa e apoio institucional.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>E-mail geral: atendimento@congressosaude.com.br</li><li>Secretaria cientifica: cientifico@congressosaude.com.br</li><li>Telefone: (31) 3200-2600</li><li>WhatsApp: (31) 99888-2600</li><li>Horario: segunda a sexta, das 09h as 18h</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Endereco de apoio: Av. Paulista, 1000 - Bela Vista - Sao Paulo/SP.</p>
<!-- /wp:paragraph -->
HTML
      ;;
    *)
      cat <<'HTML'
<!-- wp:paragraph -->
<p>Conteudo de demonstracao.</p>
<!-- /wp:paragraph -->
HTML
      ;;
  esac
}

ensure_page() {
  local title="$1"
  local slug="$2"
  local excerpt="$3"
  local content
  local page_id

  content="$(page_markup "$slug")"
  page_id="$(wp_cmd post list --post_type=page --name="$slug" --field=ID --posts_per_page=1 | tr -d '[:space:]')"

  if [[ -z "$page_id" ]]; then
    page_id="$(wp_cmd post create --post_type=page --post_status=publish --post_name="$slug" --post_title="$title" --post_excerpt="$excerpt" --post_content="$content" --porcelain)"
    echo "Pagina criada: $title (ID $page_id)"
  else
    wp_cmd post update "$page_id" --post_title="$title" --post_excerpt="$excerpt" --post_content="$content" --post_status=publish >/dev/null
    echo "Pagina atualizada: $title (ID $page_id)"
  fi

  PAGE_IDS["$slug"]="$page_id"
}

ensure_posts() {
  local existing
  existing="$(wp_cmd post list --post_type=post --name='abertura-do-congresso-2026' --field=ID --posts_per_page=1 | tr -d '[:space:]')"
  if [[ -z "$existing" ]]; then
    wp_cmd post create --post_type=post --post_status=publish \
      --post_name='abertura-do-congresso-2026' \
      --post_title='Abertura do congresso 2026: o que esperar' \
      --post_content='<p>O comite organizador anuncia a abertura oficial do congresso com uma programacao voltada a pratica clinica e inovacao cientifica.</p><figure><img src="https://picsum.photos/seed/post-abertura/1200/620" alt="Abertura do congresso"/></figure>' >/dev/null
  fi

  existing="$(wp_cmd post list --post_type=post --name='dicas-para-aproveitar-o-evento' --field=ID --posts_per_page=1 | tr -d '[:space:]')"
  if [[ -z "$existing" ]]; then
    wp_cmd post create --post_type=post --post_status=publish \
      --post_name='dicas-para-aproveitar-o-evento' \
      --post_title='5 dicas para aproveitar melhor o evento' \
      --post_content='<p>Organize sua agenda por trilhas, reserve horarios para networking e participe das sessoes praticas com perguntas preparadas.</p><figure><img src="https://picsum.photos/seed/post-dicas/1200/620" alt="Dicas para congresso"/></figure>' >/dev/null
  fi

  existing="$(wp_cmd post list --post_type=post --name='comissao-cientifica-confirma-novas-mesas' --field=ID --posts_per_page=1 | tr -d '[:space:]')"
  if [[ -z "$existing" ]]; then
    wp_cmd post create --post_type=post --post_status=publish \
      --post_name='comissao-cientifica-confirma-novas-mesas' \
      --post_title='Comissao cientifica confirma novas mesas tematicas' \
      --post_content='<p>Novas mesas foram adicionadas para cobrir temas emergentes, incluindo IA em saude, interoperabilidade e seguranca assistencial.</p><figure><img src="https://picsum.photos/seed/post-mesas/1200/620" alt="Novas mesas tematicas"/></figure>' >/dev/null
  fi

  echo "Posts de demonstracao verificados/criados."
}

ensure_eventos() {
  if ! wp_cmd post-type exists evento >/dev/null 2>&1; then
    echo "CPT 'evento' nao encontrado. Pulando seed de eventos."
    return
  fi

  local i
  for i in 1 2 3 4 5 6; do
    local slug="sessao-cientifica-$i"
    local exists
    exists="$(wp_cmd post list --post_type=evento --name="$slug" --field=ID --posts_per_page=1 | tr -d '[:space:]')"
    if [[ -z "$exists" ]]; then
      wp_cmd post create --post_type=evento --post_status=publish \
        --post_name="$slug" \
        --post_title="Sessao cientifica $i" \
        --post_content="<p>Sessao demonstrativa $i com discussao de casos, revisao de diretrizes e aplicacao clinica.</p><figure><img src='https://picsum.photos/seed/evento-$i/1200/620' alt='Sessao cientifica $i'/></figure>" >/dev/null
      echo "Evento criado: Sessao cientifica $i"
    fi
  done
}

ensure_menu() {
  local menu="$1"
  local location="$2"
  local order=(
    home
    congresso
    inscricoes
    palestrantes
    programacao
    trabalhos
    agencia-de-turismo
    fale-conosco
  )

  if ! wp_cmd menu list --fields=name --format=csv | tail -n +2 | grep -Fxq "$menu"; then
    wp_cmd menu create "$menu" >/dev/null
    echo "Menu criado: $menu"
  fi

  local item_ids
  item_ids="$(wp_cmd menu item list "$menu" --format=ids || true)"
  if [[ -n "${item_ids// /}" ]]; then
    # Remove os itens para garantir a ordem exata exigida.
    for item_id in $item_ids; do
      wp_cmd post delete "$item_id" --force >/dev/null || true
    done
  fi

  local position=1
  local slug
  for slug in "${order[@]}"; do
    wp_cmd menu item add-post "$menu" "${PAGE_IDS[$slug]}" --title "${PAGE_TITLES[$slug]}" --position="$position" >/dev/null
    position=$((position + 1))
  done

  wp_cmd menu location assign "$menu" "$location" >/dev/null 2>&1 || {
    echo "Aviso: localizacao '$location' nao encontrada no tema atual."
  }

  echo "Menu '$menu' cadastrado com sucesso."
}

setup_site() {
  wp_cmd option update blogname "$SITE_TITLE" >/dev/null
  wp_cmd option update blogdescription "$SITE_TAGLINE" >/dev/null
  echo "Configuracoes gerais atualizadas."
}

declare -A PAGE_IDS=()
declare -A PAGE_TITLES=(
  [home]="Home"
  [congresso]="Congresso"
  [inscricoes]="Inscricoes"
  [palestrantes]="Palestrantes"
  [programacao]="Programacao"
  [trabalhos]="Trabalhos"
  [agencia-de-turismo]="Agencia de Turismo"
  [fale-conosco]="Fale Conosco"
)

declare -A PAGE_EXCERPTS=(
  [home]="Pagina inicial do congresso com destaques da edicao."
  [congresso]="Informacoes institucionais sobre o congresso e objetivos cientificos."
  [inscricoes]="Lotes, categorias e orientacoes para inscricao."
  [palestrantes]="Lista de especialistas convidados e temas principais."
  [programacao]="Agenda resumida das atividades cientificas e praticas."
  [trabalhos]="Regras e prazos para submissao de trabalhos cientificos."
  [agencia-de-turismo]="Suporte oficial para viagem, hospedagem e transfer."
  [fale-conosco]="Canais de atendimento para participantes e parceiros."
)

main() {
  ensure_wp
  setup_site

  local ordered_slugs=(
    home
    congresso
    inscricoes
    palestrantes
    programacao
    trabalhos
    agencia-de-turismo
    fale-conosco
  )

  local slug
  for slug in "${ordered_slugs[@]}"; do
    ensure_page "${PAGE_TITLES[$slug]}" "$slug" "${PAGE_EXCERPTS[$slug]}"
  done

  ensure_posts
  ensure_eventos

  ensure_menu "$MENU_NAME" "PRIMARY"
  ensure_menu "$FOOTER_MENU_NAME" "FOOTER"

  echo "Seed finalizado com sucesso."
  echo "Resumo:"
  echo "- 8 paginas principais criadas/atualizadas"
  echo "- menu principal cadastrado na ordem solicitada"
  echo "- menu de rodape sincronizado"
  echo "- posts de demonstracao criados"
  echo "- eventos de demonstracao criados quando CPT 'evento' existe"
}

main "$@"
