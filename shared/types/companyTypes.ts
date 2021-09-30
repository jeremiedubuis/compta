export type CompanyType = {
    uuid: string;
    name: string;
    type: string;
};

export type CompanyState = {
    list: CompanyType[];
    selected: CompanyType;
};
