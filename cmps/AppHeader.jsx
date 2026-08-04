const { NavLink } = ReactRouterDOM


export function AppHeader({ page = 'home', onSetPage }) {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Starter Proj</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <span> | </span>
                    <NavLink to="/about">About</NavLink>
                    <span> | </span>
                    <NavLink to="/book">books</NavLink>
                </nav>
            </section>
        </header>
    )
}
