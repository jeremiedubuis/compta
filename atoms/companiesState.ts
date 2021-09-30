import { atom } from 'recoil';
import { CompanyState } from '$types/companyTypes';

const localStorageEffect = ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') return;
    const savedValue = localStorage.getItem('selectedCompany');
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
        if (newValue.selected) {
            localStorage.setItem('selectedCompany', JSON.stringify(newValue.selected));
        }
    });
};

export const companiesState = atom<CompanyState>({
    key: 'companies',
    default: null,
    effects_UNSTABLE: [localStorageEffect]
});
