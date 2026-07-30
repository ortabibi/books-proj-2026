const { Routes, Route, HashRouter: Router } = ReactRouterDOM
import { AppHeader } from "./cmps/AppHeader.jsx"

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"


export function RootCmp() {

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                {/* <UserMsg /> */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/" element={<About />} />
                        <Route path="/" element={<BookIndex />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}