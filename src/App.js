import "./styles.css";
import { useState } from "react";
import { JSEncrypt } from "jsencrypt";
export default function App() {
	return (
		<div className="App">
			<h1>JS Encryption for Secure/Sensitive Data Transfer</h1>
			<JSEncryption />
		</div>
	);
}

const JSEncryption = () => {
	const pub_key =
		"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeoeE0ytVpM2uDidhMFilE13nXHfEIQqfMJ1TUqGotm6HI72h6ZEqf2PhZEcZkyV34u1d822dqoJMs00IlQiNsshdzU2cIrDYhqPNRfkcHQXCzZoep/BAUvUQrDouhSl89BQXzxK45CLdoy2kcvqqXb2U+GK9LmSqxJSWPEZDYZQIDAQAB";

	const priv_key =
		"MIICXAIBAAKBgQDeoeE0ytVpM2uDidhMFilE13nXHfEIQqfMJ1TUqGotm6HI72h6ZEqf2PhZEcZkyV34u1d822dqoJMs00IlQiNsshdzU2cIrDYhqPNRfkcHQXCzZoep/BAUvUQrDouhSl89BQXzxK45CLdoy2kcvqqXb2U+GK9LmSqxJSWPEZDYZQIDAQABAoGAK4efTwExxQYGyYtUPVw/6XPwIL17+U9/G429Km9bg1tgwLb+yJ9/b82ukUvGbMJqm02WB5WmnNSUsjkEP+C0qBimK6RiUtxcpRag+aYqJTh6y6Om7nmt3A5Z0BHpdLfJj2TK7o/kyT0mrK7Gnc6g061CkNtj3Eskf3CQiaoJKekCQQD3yQ13UQZwhHNE+av5c/9UYRmQZ76hUevPo4v4H4CPc0CSQDcBGiNlxpIwnoj26BzrDnumwa1vCMRQubhzBHzXAkEA5gNaqS6tRbukLR0pgv2OhruHzqQ2TN8MmFLHNY7MHirvBBZDHtoGforVTA0sOoqdE9Eu7WD6XRnXobeXRvKRIwJAaprRdFgj0RzrCu3wE27Yl1D/UqWP2pAISFkwyxuikBUh3spJ3+uC9zKrisdqXfAXIPomMOR63Z6D98cvmCyCGQJBANEL3VsD9DD7cCQca/0ES4QCblSNhFhrI/xQx4LSrIsChEbXoNsqVlqt/VtoYXk3P7miFZ9i00jIUuVEgXXWwbcCQCIU03t1wor4oVjRRo3khmu9AUsg1MFc4YXdpVa2pQrrZYleyfvZ9YlQ9IxCmb1zdHaft5pdAnFfoWd4sLEP8kE=";

	const [account, setAccount] = useState();
	const [password, setPassword] = useState();
	const [clientSendData, setClientSendData] = useState();
	const [serverGetData, setServerGetData] = useState();
	const handleLoginClick = () => {
		const encrypt = new JSEncrypt();
		encrypt.setPublicKey(pub_key);

		let params = {
			account: account,
			password: password,
			date: new Date(),
			random: Math.random(5)
		};
		//  Data Encrypt
		let encryptedLoginData = encrypt.encrypt(JSON.stringify(params));
		setClientSendData(encryptedLoginData);

		// on Server Decrypt
		const decrypt = new JSEncrypt();
		decrypt.setPrivateKey(priv_key);
		let serverGetData = decrypt.decrypt(encryptedLoginData);
		setServerGetData(serverGetData);
	};

	return (
		<>
			<div>
				<label>Account: </label>
				<input
					onChange={(ele) => {
						setAccount(ele.target.value);
					}}
				/>
				<br /> <br />
				<label>Password: </label>
				<input
					type="password"
					onChange={(ele) => {
						setPassword(ele.target.value);
					}}
				/>{" "}
				<br /> <br />
				<button onClick={handleLoginClick}> Login! </button>
				<hr />
				<p>
					<b>Client Sent Data :</b> <p>{clientSendData}</p>
				</p>
				<hr />
				<p>
					<b>Server Recieve Data :</b> <p>{serverGetData}</p>
				</p>
				<hr />
			</div>
		</>
	);
};
