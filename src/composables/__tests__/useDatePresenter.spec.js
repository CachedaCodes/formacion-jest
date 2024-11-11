import useDatePresenter from '../useDatePresenter';

describe('useDatePresenter', () => {
    const mockedDate = new Date();
    jest
        .useFakeTimers()
        .setSystemTime(mockedDate);

    it('returns the current date as ref', () => {
        const { now } = useDatePresenter();
        expect(now.value).toEqual(mockedDate);
    });

    it('returns the formatted today date as ref', () => {
        const { formattedToday } = useDatePresenter();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = mockedDate.toLocaleDateString('en-EN', options);
        expect(formattedToday.value).toEqual(formattedDate);
    });

    it('returns the formatted current time as ref', () => {
        const { formattedNowTime } = useDatePresenter();
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formattedTime = mockedDate.toLocaleString(undefined, options);
        expect(formattedNowTime.value).toEqual(formattedTime);
    });
});