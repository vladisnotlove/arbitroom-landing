
// base type

type Route = {
    path: '/',
}

const routeWithFragments = <T extends Record<string, string>>(route: Route, fragments: T) => {
    return {
        ...route,
        pathWithFragment: (fragmentName: keyof T) => route.path + "/#" + fragments[fragmentName],
        fragments,
    }
}

// routes

const indexRoute = routeWithFragments(
    {
        path: '/'
    },
    {
        howCashGenerated: 'howCashGenerated',
        advantagesOfNeuralNetwork: 'advantagesOfNeuralNetwork',
        whatFirst: 'whatFirst',
        clientsAboutUs: 'clientsAboutUs'
    }
)

const routes = {
    index: indexRoute
}

export default routes;