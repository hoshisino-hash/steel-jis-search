# 鋼材JIS規格 早見表 — デプロイ手順書

## このパッケージの内容

```
steel-jis-pwa/
├── index.html              アプリ本体(HTML+CSS+JS)
├── manifest.json           PWA設定
├── service-worker.js       オフライン動作
├── icon-192.png            アイコン(192x192)
├── icon-512.png            アイコン(512x512)
├── icon-maskable-512.png   Android用マスカブルアイコン
└── apple-touch-icon.png    iOS用アイコン(180x180)
```

---

## デプロイ手順(Cloudflare Pages)

### Step 1: Cloudflareアカウント作成

1. https://dash.cloudflare.com/sign-up にアクセス
2. メールアドレス + パスワードで登録
3. メールに届く確認リンクをクリック

所要時間:約3分

### Step 2: Pagesプロジェクト作成

1. Cloudflareダッシュボードにログイン
2. 左サイドバーの「Workers & Pages」をクリック
3. 「Create application」→「Pages」タブ→「Upload assets」を選択
4. プロジェクト名を入力(例: `steel-jis-search`、半角英数小文字とハイフンのみ)
5. 「Create project」をクリック

### Step 3: ファイルをアップロード

1. このZIPを解凍する(以下7ファイルが出てくる)
   - index.html
   - manifest.json
   - service-worker.js
   - icon-192.png
   - icon-512.png
   - icon-maskable-512.png
   - apple-touch-icon.png
2. Cloudflareの画面で「Drag and drop」エリアに、上記**7ファイルすべて**をまとめてドラッグ&ドロップ
   ※ フォルダごとではなく、ファイル単位でドロップしてください
3. 「Deploy site」をクリック
4. 1〜2分待つとデプロイ完了

### Step 4: URL取得

デプロイ完了後、以下のようなURLが発行されます:

```
https://steel-jis-search.pages.dev
```

このURLをスマホで開けばアプリが起動します。

---

## スマホへのインストール

### iPhone / iPad (Safariのみ)

1. Safariで上記URLを開く
2. 下部の「共有」ボタン(□に↑の矢印)をタップ
3. メニューを下にスクロール
4. 「ホーム画面に追加」をタップ
5. 名前を確認して「追加」

### Android (Chrome等)

1. Chromeで上記URLを開く
2. 右上の「︙」メニューをタップ
3. 「ホーム画面に追加」または「アプリをインストール」をタップ
4. 「インストール」を確認

これでホーム画面にアイコンが追加され、タップで起動できます。
オフラインでも動作します。

---

## 職場での共有方法

### QRコード作成

デプロイ後のURL(例: `https://steel-jis-search.pages.dev`)をQRコード化:

- 無料のQRコード生成サイトを使用:
  - https://qr-code-generator.com/
  - https://qr.quel.jp/
- 上記サイトでURLを貼り付け→PNGダウンロード→印刷して職場に掲示

### 配布の流れ

1. 印刷したQRコードを職場の壁・掲示板に貼る
2. 同僚が各自のスマホでQRコード読み取り
3. ブラウザでアプリが開く
4. 「ホーム画面に追加」でインストール完了

---

## 更新方法(後日データを増やしたとき)

1. 更新版のindex.htmlを作成
2. Cloudflare Pagesプロジェクトを開く
3. 「Create deployment」→「Upload assets」
4. 新しいファイルをドラッグ&ドロップ→「Deploy」
5. 同じURLのまま、内容だけ更新される

ユーザー側は次回起動時に自動で最新版に更新されます
(Service Workerのキャッシュ機構による)。

---

## 注意事項

- アプリ内の「仮追加データ・撮影写真・お気に入り」は各ユーザーの**端末ローカル**に保存されます
- 共有されるのは「ベースとなる70種類の鋼材データ」のみ
- 個人のデータは「エクスポート」でJSONバックアップ可能
- 端末を変更する場合は、エクスポート→新端末でインポート、で引き継げます

---

## トラブルシューティング

**Q. アップロード時に「No index.html found」エラーが出る**
→ ZIPを解凍したフォルダ「ごと」ではなく、中の**ファイル7つを直接**ドロップしてください

**Q. アイコンが表示されない**
→ icon-*.png ファイルが index.html と**同じ階層**にあるか確認

**Q. オフラインで動かない**
→ 一度オンラインで起動してから2回目以降オフライン可能。初回はキャッシュ作成が必要

**Q. ホーム画面に追加メニューが出ない**
→ iPhoneはSafari、AndroidはChromeで開いてください。他のブラウザでは不可

---

質問があれば、Claudeに「Cloudflare Pagesにデプロイしようとしたら○○のエラーが出た」
と画像付きで聞けば手順を案内します。
