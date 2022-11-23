export class CreateApplicationDto {
    newsId: string;
    userId: string;
    CV: string;
    intro: string;
}

export class UpdateApplicationDto {
    CV: string;
    intro: string;
    status: string;
}
