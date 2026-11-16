# ObiFans

ObiFans é um site de humor dedicado ao Obiwan. A experiência é fictícia e apresenta fotos, vídeos e um clube de mentirinha.

O site é estático e não exige dependências nem compilação. O domínio configurado é [obifans.com.br](https://obifans.com.br).

## Visualização local

Na raiz do projeto, execute:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra <http://localhost:8000>. O servidor expõe os arquivos acessíveis na pasta do projeto para processos locais; não mantenha segredos nela. As fotos ficam em `fotos/` e os vídeos em `videos/`. Nomes e caminhos diferenciam maiúsculas, minúsculas e acentos.

## Experiência fictícia

O checkout não cobra, não cria assinatura e não solicita dados financeiros. O desbloqueio dura apenas a sessão da página e não protege o conteúdo. O destaque diário segue a data local do visitante.

## Publicação

Para publicar no GitHub Pages, em **Settings → Pages**, selecione a publicação a partir de uma branch e escolha a branch desejada e a pasta `/ (root)`. O arquivo `CNAME` informa o domínio `obifans.com.br`.

No provedor DNS, configure o domínio conforme as [instruções do GitHub Pages para domínios personalizados](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) e remova registros conflitantes. Após a propagação, confirme o domínio em **Settings → Pages** e habilite HTTPS quando disponível.

## Direitos e uso

Todos os direitos são reservados. É permitido se inspirar nas ideias do projeto, mas essa permissão não autoriza copiar, distribuir, modificar ou reutilizar seus materiais. Os termos e as ressalvas constam em [LICENSE](LICENSE).
