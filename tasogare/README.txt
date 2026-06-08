# 薄明（はくめい）— a desk companion at twilight

薄明の書斎で、静かな少女「千宵（ちよ）」と一緒に作業する伴走PWA。
環境音（端末内で合成）とコンパニオン演出のデスクワーク支援アプリ。

## このフォルダの内容

```
tasogare/
├── index.html          アプリ本体（HTML+CSS+JS）
├── manifest.json       PWA設定
├── service-worker.js   オフライン動作
├── icon-192.png / icon-512.png / icon-maskable-512.png / apple-touch-icon.png
├── 企画設計書.md        企画・全体設計
├── キャラクター制作.md   千宵の作画→リギング→喋るの制作ガイド
├── lib/README.md       最終キャラ(Rive)の配置ガイドと「契約」
├── (chiyo.riv)         ※最終キャラのモデル。置くと自動でSVG→Riveに切替
└── (lib/rive.min.js)   ※Rive Webランタイム。同上
```

## 今すぐ動くもの（v1）

- 薄明グラデーションの空（時間帯で移ろう）・星・雲・窓・卓上ランプ
- 環境音：雨／風／焚き火／波／時計／夜（すべて端末内で合成、素材不要）
  - ミキサーでミックス、プリセット保存
- 「作業をはじめる/おえる」で千宵の状態が切替、作業中は筆記音が同期
- 設定：空の時間帯／動きを抑える／千宵の一言／声で話す（試験）
- 完全オフライン動作・ホーム画面に追加可

> 現在のキャラはコード手描きSVGの**暫定プレースホルダ**。
> 最終キャラ（高品質・ヌルヌル動く・喋る）への差し替え手順は `lib/README.md`。

## ローカルで試す

このフォルダで簡易サーバを立てて開く（Service Worker はfile://では動かないため）：

```
cd tasogare
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

※音は最初のタップ/クリック後に鳴り始めます（ブラウザの自動再生制限のため）。
※「声で話す」をONにすると端末の音声合成で千宵がつぶやきます。

## デプロイ（Cloudflare Pages 等）

姉妹アプリ（鋼材JIS／ボルト）と同じ静的ホスティングでOK。
`tasogare/` の中身一式をアップロードするか、リポジトリを連携してこのサブパスを公開。
更新時は `service-worker.js` の `CACHE_VERSION` を上げると確実に反映されます。

## 最終キャラ（千宵）の差し替え

1. `キャラクター制作.md` のプロンプトで作画（パーツ分離PSD）
2. Riveで `lib/README.md` の契約名（ステートマシン `Chiyo` ／入力 working/resting/idle/mouth）で
   リギングし `chiyo.riv` を書き出し
3. `chiyo.riv` をアプリ直下、`rive.min.js` を `lib/` に配置 → 自動でRiveに切替
4. `CACHE_VERSION` を上げて再デプロイ
