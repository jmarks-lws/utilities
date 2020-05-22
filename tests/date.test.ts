import {
  utcYmdToDate,
} from '../src/dates/utcYmdToDate';

describe('Date utilities tests', () => {
  test('utcYmdToDate', async () => {
    const utcDate = utcYmdToDate('2014-01-01');
    const shouldBe = Date.UTC(2014, 0, 1);
    expect(utcDate.getTime()).toBe(shouldBe);
    const utcDateTime = utcYmdToDate('2014-01-01T20:01:10');
    const timeShouldBe = Date.UTC(2014, 0, 1, 20, 1, 10);
    expect(utcDateTime.getTime()).toBe(timeShouldBe);
    const utcDateTimeMS = utcYmdToDate('2014-01-01T20:01:10:005');
    const timeMSShouldBe = Date.UTC(2014, 0, 1, 20, 1, 10, 5);
    expect(utcDateTimeMS.getTime()).toBe(timeMSShouldBe);
  });
});
