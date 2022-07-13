function loginPage() {
    return (
        <form>
            <label htmlFor='username-login'>Username</label>
            <input type='text' id='username-login' name='username-login'></input>
            <label htmlFor='username-email'>Email</label>
            <input type='text' id='username-email' name='username-email'></input>
            <label htmlFor='username-password'>Password</label>
            <input type='text' id='username-password' name='username-password'></input>
        </form>
    )
}

export default loginPage;