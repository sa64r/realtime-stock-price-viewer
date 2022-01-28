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
        <div className="stocks-table text-left w-full">
            <table class="table-auto border-collapse border w-full rounded">
                <thead class="">
                    <tr>
                        <th class="p-2">Crypto</th>
                        <th class="p-2 text-right">Price</th>
                        <th class="p-2 text-right">Last Refresh</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoArray.map((crypto) => {
                        return (
                            <tr class="border">
                                <td class=" px-4 py-2  flex">{crypto ? <img class="mr-3 w-7" src={`https://cryptologos.cc/logos/thumbs/${crypto['2. From_Currency Name'].toLowerCase()}.png?v=018`}></img> : <></>}{crypto ? crypto['2. From_Currency Name'] : '...Loading'}</td>
                                <td class=" px-4 py-2  text-right">{crypto ? `£${crypto['5. Exchange Rate']}` : '...Loading'}</td>
                                <td class=" px-4 py-2  text-right">{crypto ? crypto['6. Last Refreshed'] : '...Loading'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default StocksTable;