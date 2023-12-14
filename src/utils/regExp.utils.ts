/**
 * 이메일 정규표현식 함수
 * @param targetEmail
 */
export const checkValidEmail = (targetEmail: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(targetEmail);
}