import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import { asyncSignInFromToken } from '$async/userAsync';
import { userState } from '$atoms/userState';
import { useRouter } from 'next/router';
import { companiesState } from '$atoms/companiesState';
import { Button, ButtonTone } from '$components/buttons/Button/Button';
import { useI18n } from '$hooks/useI18n';
import Link from 'next/Link';

const App = ({ Component, pageProps }) => {
    const setUser = useSetRecoilState(userState);
    const [companies, setCompanies] = useRecoilState(companiesState);
    const { route, push } = useRouter();
    const isApp = route.startsWith('/app');
    const [__] = useI18n();

    useEffect(() => {
        asyncSignInFromToken().then(({ companies, ...user } = {}) => {
            if (user) {
                setUser(user);
                setCompanies({
                    list: companies,
                    selected: companies[0] || null
                });
            } else {
                if (route.startsWith('/app')) push('/');
            }
        });
    }, []);

    return (
        <>
            {isApp && (
                <header>
                    {companies?.list?.length ? (
                        <select>
                            {companies.list.map((c) => (
                                <option>{c.name}</option>
                            ))}
                        </select>
                    ) : (
                        <Button tone={ButtonTone.Primary} href="/app/companies/new">
                            {__('createCompany')}
                        </Button>
                    )}
                    {companies?.selected ? (
                        <nav>
                            <ul>
                                <li>
                                    <Link href="/app/fiscal-year">Années fiscales</Link>
                                </li>
                            </ul>
                        </nav>
                    ) : null}
                </header>
            )}
            <Component {...pageProps} />
        </>
    );
};

function MyApp(props) {
    return (
        <RecoilRoot>
            <App {...props} />
        </RecoilRoot>
    );
}

export default MyApp;
