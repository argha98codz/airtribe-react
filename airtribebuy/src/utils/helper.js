// Use this function anywhere you need to check if user is authenticated or not
export default function isUserAuth() {
    const isAuth = localStorage.getItem('airtribe-user-auth');
    if (!isAuth || isAuth !== 'authenticated' ) {
        return false;
    }
    return true;
}