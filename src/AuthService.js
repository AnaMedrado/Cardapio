import decode from 'jwt-decode';
export default class AuthService {
    // Inicializando variáveis ​​importantes
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080/qrpedir/' // Dominio do servidor da API
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        console.log(JSON.stringify({
            username,
            password,
        }))
        console.log("login1");
        // Obter um token do servidor da API usando a API de busca
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            })
        }).then(res => {
            console.log('Retornou do server token' + res.token)

            this.setToken(res.token) // Configurando o token em localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Verifica se há um token salvo e ainda é válido
        const token = this.getToken() // Obtendo token do localstorage
        return !!token && !this.isTokenExpired(token) 
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { //Verificando se o token expirou.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Salva o token do usuário em localStorage
        console.log('salvando token' + idToken)
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Recupera o token do usuário do localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Limpar token do usuário e dados de perfil do localStorage
        console.log("sair");
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Usando o pacote jwt-decode npm para decodificar o token
        return decode(this.getToken());
    }


    fetch(url, options) {
        console.log("fetch");
        const token = this.getToken()

        if (!options) {
            options =  {}
        }
        options.headers = {
            "Authorization": "Bearer " + (token != null ? token : ''),
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8"  
        }
        return fetch(url, options)
            .then(this._checkStatus)
            .then(response => response.json())
    }

    post(url, obj) {
        return fetch(url, {
            method : 'POST',
            body : JSON.stringify(obj),
            headers :  {
                "Authorization": "Bearer " + this.getToken(),
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"    
            }
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    put(url, obj) {
        return fetch(url, {
            method : 'PUT',
            body : JSON.stringify(obj),
            headers :  {
                "Authorization": "Bearer " + this.getToken(),
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"    
            }
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    delete(url, obj) {
        return fetch(url, {
            method : 'DELETE',
            body : JSON.stringify(obj),
            headers :  {
                "Authorization": "Bearer " + this.getToken(),
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"    
            }
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // gera um erro caso o status da resposta não seja um sucesso
        console.log("_checkStatus");

        if (response.status >= 200 && response.status < 300) { // O status de sucesso situa-se entre 200 e 300
            return response
        } else {
            console.log('Falha ao logar')
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}