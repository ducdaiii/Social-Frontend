import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopCryptoQuery } from "../api/cryptoApi";
import { connectWebSocket } from "../utilities/websocket";
import { updatePrice } from "../redux/wsSlice";
import formatCurrency from "../utilities/formatCurrency";
import LoadingMotion from "../pages/LoadingMotion";

const PAGE_SIZE = 40;

const CryptoList = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetTopCryptoQuery();
  const prices = useSelector((state) => state.cryptoWebSocket);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    connectWebSocket(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      Object.values(data.data).forEach((asset) => {
        const symbol = asset.symbol.toLowerCase() + "usdt";
        const ws = new WebSocket(
          `wss://stream.binance.com:9443/ws/${symbol}@trade`
        );

        ws.onmessage = (event) => {
          const tradeData = JSON.parse(event.data);
          dispatch(
            updatePrice({
              asset_id: asset.symbol,
              price: parseFloat(tradeData.p),
            })
          );
        };

        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () =>
          console.log(`WebSocket for ${asset.symbol} disconnected ❌`);
      });
    }
  }, [dispatch, data]);

  if (isLoading) return <p className="text-white"><LoadingMotion/></p>;
  if (error) return <p className="text-red-500">Error fetching data</p>;

  // Chuyển `data.data` thành array
  let assets = data?.data ? Object.values(data.data) : [];

  // Thêm real-time price vào dữ liệu
  assets = assets.map((asset) => ({
    ...asset,
    realTimePrice: prices[asset.symbol] || asset.quote.USD.price,
    market_cap: (prices[asset.symbol] || asset.quote.USD.price) * asset.circulating_supply,
  }));

  // Sắp xếp theo cột
  assets.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  // Phân trang
  const totalPages = Math.ceil(assets.length / PAGE_SIZE);
  const paginatedAssets = assets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Hàm thay đổi trang
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Hàm thay đổi sắp xếp
  const changeSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <div className={` text-white p-8 rounded-lg}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-left">
            <tr className="border-b border-gray-700 cursor-pointer">
              <th className="p-2" onClick={() => changeSort("name")}>Name</th>
              <th className="p-2 text-right" onClick={() => changeSort("realTimePrice")}>Price</th>
              <th className="p-2 text-right" onClick={() => changeSort("quote.USD.percent_change_24h")}>Change (USD)</th>
              <th className="p-2 text-right" onClick={() => changeSort("quote.USD.volume_24h")}>24h Volume</th>
              <th className="p-2 text-right" onClick={() => changeSort("market_cap")}>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map((asset) => (
              <tr key={asset.id} className=" hover:bg-gray-800 text-xl">
                <td className="p-2 flex items-center space-x-2">
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.id}.png`}
                    alt={asset.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-bold">{asset.symbol}</span>
                  <span className="text-gray-400 text-sm">{asset.name}</span>
                </td>
                <td className="p-2 text-right">${asset.realTimePrice.toFixed(2)}</td>
                <td
                  className={`p-2 font-bold text-right
                    ${asset.quote.USD.percent_change_24h > 0 ? "text-green-500" : ""}
                    ${asset.quote.USD.percent_change_24h < 0 ? "text-red-500" : ""}
                    ${asset.quote.USD.percent_change_24h === 0 ? "text-yellow-500" : ""}
                  `}
                >
                  {asset.quote.USD.percent_change_24h.toFixed(2)}%
                </td>
                <td className="p-2 text-right">{formatCurrency(asset.quote.USD.volume_24h)}</td>
                <td className="p-2 text-right">${asset.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-4 space-x-10">
        <button
          className="px-3 py-1 bg-gray-700 rounded text-white"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅️ Prev
        </button>
        <span className="text-lg">{currentPage} / {totalPages}</span>
        <button
          className="px-3 py-1 bg-gray-700 rounded text-white"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default CryptoList;