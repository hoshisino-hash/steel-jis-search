# ボルト・ねじ規格 早見表 — デプロイ手順書

## このパッケージの内容

```
bolts/
├── index.html              アプリ本体(HTML+CSS+JS)
├── manifest.json           PWA設定
├── service-worker.js       オフライン動作
├── icon-192.png            アイコン(192x192)
├── icon-512.png            アイコン(512x512)
├── icon-maskable-512.png   Android用マスカブルアイコン
└── apple-touch-icon.png    iOS用アイコン(180x180)
```

## 機能

1. **寸法** — メートルねじ M2〜M42 の有効径・谷径・応力断面積、
              六角ボルト/キャップボルト寸法、強度区分別の推奨締付トルク表
2. **強度区分** — ISO 898-1 / JIS B 1051 (4.6〜14.9) と
                  ISO 3506-1 (A2-50〜A4-80 ステンレス) の Rm・Rp・HV・代表材質
3. **締付トルク** — サイズ・強度区分・摩擦係数を選ぶと推奨軸力と
                    締付トルクを自動計算。参照表もハイライト表示
4. **インチ** — UNC / UNF (#4 〜 1-1/4) の寸法・応力断面積、
                SAE Grade 別の推奨トルク

## デプロイ手順(Cloudflare Pages)

姉妹アプリ(鋼材JIS規格早見表)と全く同じ手順:

1. https://dash.cloudflare.com/ で Workers & Pages → Create application
2. 「Pages」タブ → 「Upload assets」を選択
3. プロジェクト名(例: `bolt-spec-search`)を入力 → 「Create project」
4. このフォルダ内の **7ファイルすべて** をドラッグ&ドロップ
   - index.html
   - manifest.json
   - service-worker.js
   - icon-192.png
   - icon-512.png
   - icon-maskable-512.png
   - apple-touch-icon.png
5. 「Deploy site」をクリック

デプロイ完了後、`https://bolt-spec-search.pages.dev` のようなURLが発行されます。

## スマホへのインストール

### iPhone / iPad (Safariのみ)
Safariで開く → 共有 → 「ホーム画面に追加」

### Android (Chrome等)
Chromeで開く → ︙メニュー → 「ホーム画面に追加」または「インストール」

オフラインでも動作します。

## 姉妹アプリとの連携

メニューから「鋼材JIS規格 早見表へ」をタップすると `../` (親URL) に遷移します。
両アプリを同じドメインに置く場合 (例: `tools.example.com/bolts/` と `tools.example.com/`)、
シームレスに行き来できます。

別ドメインで運用する場合は、index.html の steel-app メニューのリンク先を編集してください
(`window.location.href = "../";` の部分)。

## 出典(JIS/ISO/ASME)

- JIS B 0205-4:2001 — メートル並目ねじ・細目ねじ
- JIS B 0209-1〜4:2010 — 一般用メートルねじ 公差
- JIS B 1051:2014 — 炭素鋼及び合金鋼製締結用部品の機械的性質
- JIS B 1054-1:2013 — 耐食ステンレス鋼製締結用部品の機械的性質
- JIS B 1176:2014 — 六角穴付きボルト
- JIS B 1180:2014 — 六角ボルト
- ISO 898-1:2013 — Mechanical properties of fasteners (carbon/alloy steel)
- ISO 3506-1:2009 — Mechanical properties of corrosion-resistant fasteners
- ASME B1.1-2003 — Unified Inch Screw Threads (UN/UNR)
- SAE J429 — Mechanical and Material Requirements for Externally Threaded Fasteners

## 注意事項

- 表示値は規格値および計算値です。実機の安全率・座面摩擦・締付方法による補正が必要
- 重要保安部品では各メーカー指示値・社内基準を優先
- 六角ボルトの二面幅は旧JIS(M10=17, M12=19, M14=22)を採用。
  JIS B 1180:2014 ISO第一選択(M10=16, M12=18, M14=21)を用いる場合は data 部分を編集
- ISO・JIS規格の改訂で数値が変わることがあるので最新版を確認のこと
