import { updatePrice } from "../redux/wsSlice";

export const connectWebSocket = (dispatch, assets) => {
  if (!assets || assets.length === 0) return;

  // Tạo danh sách streams cho nhiều tài sản
  const streams = assets.map((asset) => `${asset.symbol.toLowerCase()}usdt@trade`).join("/");
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

  ws.onopen = () => console.log("WebSocket connected ✅");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const symbol = data.s.replace("USDT", "");
    dispatch(updatePrice({ asset_id: symbol, price: parseFloat(data.p) }));
  };

  ws.onerror = (error) => console.error("WebSocket error:", error);

  ws.onclose = () => {
    console.log("WebSocket disconnected ❌, reconnecting...");
    setTimeout(() => connectWebSocket(dispatch, assets), 5000);
  };
};