import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Wallet: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [amount, setAmount] = useState<string>('');

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/wallet/balance');
            setBalance(Number(response.data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Fehler beim Abrufen des Saldos:', error.response?.data || error.message);
            } else {
                console.error('Fehler beim Abrufen des Saldos:', error);
            }
        }
    };

    const handleDeposit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/wallet/deposit', { amount: parseFloat(amount) });
            setBalance(Number(response.data));
            setAmount('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Fehler beim Einzahlen:', error.response?.data || error.message);
            } else {
                console.error('Fehler beim Einzahlen:', error);
            }
        }
    };

    const handleWithdraw = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/wallet/withdraw', { amount: parseFloat(amount) });
            setBalance(Number(response.data));
            setAmount('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Fehlerhafte Entnahme:', error.response?.data || error.message);
            } else {
                console.error('Fehlerhafte Entnahme:', error);
            }
        }
    };


    return (
        <div>
            <h2>Wallet</h2>
            <p>Aktueller Saldo: €{balance.toFixed(2)}</p>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Betrag eingeben"
            />
            <button onClick={handleDeposit}>Einzahlung</button>
            <button onClick={handleWithdraw}>Auszahlen</button>
        </div>
    );
};

export default Wallet;
