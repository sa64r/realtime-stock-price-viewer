/* eslint-disable no-loop-func */
import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;
const apiURL = 'https://www.alphavantage.co/query?'


const StocksTable = () => {

    const cryptos = ['BTC', 'SOL', 'ETH']
    const [bitcoin, setBitcoin] = useState(0);
    const [solana, setSolana] = useState(0);
    const [ethereum, setEthereum] = useState(0);
    const [fiat, setFiat] = useState('GBP');

    useEffect(() => {
        const interval = setInterval(() => {
            for (let crypto of cryptos) {
                fetch(`${apiURL}function=CURRENCY_EXCHANGE_RATE&from_currency=${crypto}&to_currency=${fiat}&apikey=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        const cryptoInfo = data['Realtime Currency Exchange Rate'];
                        if (crypto === 'BTC') {
                            setBitcoin(cryptoInfo)
                        } else if (crypto === 'SOL') {
                            setSolana(cryptoInfo)
                        } else if (crypto === 'ETH') {
                            setEthereum(cryptoInfo)
                        }
                    })
                    .catch(err => console.log(err));
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [fiat])

    useEffect(() => {
        console.log('bitcoin', bitcoin)
    }, [bitcoin])

    const cryptoArray = [bitcoin, solana, ethereum];
    return (
        <div className="stocks-table">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Crypto</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoArray.map((crypto) => {
                        return (
                            <tr>
                                <td className="border px-4 py-2">{crypto ? crypto['2. From_Currency Name'] : '...Loading'}</td>
                                <td className="border px-4 py-2">{crypto ? crypto['5. Exchange Rate'] : '...Loading'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StocksTable;