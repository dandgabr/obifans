# ObiFans

Site estático do Obiwan, sem dependências ou etapa de compilação.

## Visualização local

Na raiz do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. As fotos ficam em `fotos/` e vídeos em `videos/`. Os nomes e caminhos são sensíveis a maiúsculas e acentos.

## Publicação no GitHub Pages

Envie os arquivos para um repositório no GitHub. Em **Settings → Pages**, selecione a publicação a partir de uma branch, escolha a branch desejada e a pasta `/ (root)` e salve. Aguarde a publicação. O arquivo `CNAME` informa o domínio `obifans.com.br`.

No provedor DNS, configure o domínio conforme as instruções oficiais atuais do GitHub Pages para domínio personalizado e remova registros conflitantes. Após a propagação, confirme o domínio em **Settings → Pages** e habilite HTTPS quando disponível. Consulte https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site para registros e orientações atualizadas.

## Experiência fictícia

O checkout é uma simulação sem cobrança ou coleta de dados. O desbloqueio existe somente durante a sessão da página; não oferece proteção real de conteúdo. O destaque diário é determinado pela data local do visitante.
