import React, {useMemo, useState} from 'react';
import {useTheme} from 'styled-components';
import {Row} from '../shared/components/Row';
import {Column} from '../shared/components/Column';
import {Text} from '../shared/components/Text';
import {TextInput} from '../shared/components/TextInput';
import {NumberInput} from '../shared/components/NumberInput';
import {MultiDropdown} from '../shared/components/MultiDropdown';
import {Dropdown} from '../shared/components/Dropdown';
import {Button} from '../shared/components/Button';
import {axiosInstance} from '../api/api';

export const Scoring = React.memo(function() {
  const theme = useTheme();
  const [microloanAmount, setMicroloanAmount] = useState('');
  const [microloanTerm, setMicroloanTerm] = useState('');
  const [mainIncome, setMainIncome] = useState<{name: string, value: any} | undefined | null>();
  const [mainIncomeValue, setMainIncomeValue] = useState('');
  const [extraIncome, setExtraIncome] = useState<Array<{name: string, value: any}> | []>([]);
  const [extraIncomeValue, setExtraIncomeValue] = useState('');
  const [educationLevel, setEducationLevel] = useState<{name: string, value: any} | undefined | null>();
  const [homeOwnershipStatus, setHomeOwnershipStatus] = useState<{name: string, value: any} | undefined | null>();
  const [cadastralNumber, setCadastralNumber] = useState('');
  const [peopleInCare, setPeopleInCare] = useState<{name: string, value: any} | undefined | null>();
  const [expenditurePerMonth, setExpenditurePerMonth] = useState('');
  const [vehicleSeries, setVehicleSeries] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  //const [carOwnership, setCarOwnership] = useState('');

  function changeVehicleSeries(value: string) {
    if (!!value.match(/^[a-zA-Z0-9]*$/)) {
      setVehicleSeries(value);
    }
  }
  function changeRegistrationNumber(value: string) {
    if (!!value.match(/^[a-zA-Z0-9]*$/)) {
      setRegistrationNumber(value);
    }
  }

  /*function changeCarOwnership(value: string) {
    if (!!value.match(/^[a-zA-Z0-9]*$/)) {
      setCarOwnership(value);
    }
  }*/

  function clearIncomeType() {
    setExtraIncome([]);
  }

  const mainIncomeOptions = useMemo(() => [
    {name: 'Зарплата', value: 1},
    {name: 'Доход от аренды', value: 2},
    {name: 'Получение средств из-за рубежа', value: 3},
    {name: 'Пенсия', value: 4},
    {name: 'Дивиденды', value: 5},
    {name: 'Доход от предпринимательской деятельности', value: 6},
    {name: 'Выплаты по социальному обеспечению', value: 7},
    {name: 'Другое', value: 8},
  ], []) ;

  const extraIncomeOptions = useMemo(() => mainIncome
    ? mainIncomeOptions.filter(option => option.name !== mainIncome['name'] && option.value !== mainIncome['value'])
    : mainIncomeOptions
  , [mainIncome, mainIncomeOptions]);

  const educationOptions = useMemo(() => [
    {name: 'Неоконченное среднее образование (школа)', value: 1},
    {name: 'Общее среднее образование (школа)', value: 2},
    {name: 'Средне специальное/профессиональное образование (колледж, техникум)', value: 3},
    {name: 'Неоконченное высшее образование', value: 4},
    {name: 'Бакалавр/Магистр', value: 5},
    {name: 'Доктор наук', value: 6},
  ], []) ;

  const ownershipStatusOptions = useMemo(() => [
    {name: 'Принадлежит клиенту', value: 1},
    {name: 'В собственности супруга/супруги', value: 2},
    {name: 'Принадлежит члену семьи', value: 3},
    {name: 'Взято в аренду', value: 4},
    {name: 'Заложено', value: 5},
    {name: 'Другое', value: 6},
  ], []) ;

  const peopleInCareOptions = useMemo(() => [
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
  ], []) ;

  const labelContainerWidth = '230px';
  const itemWidth = '555px';

  const submitQuestionnaire = () => {
    const requestIncomeOptions = [
      {
        id: 1,
        optionEn: 'Salary',
        optionRu: 'Зарплата',
        optionUz: 'Ish haqi',
      },
      {
        id: 2,
        optionEn: 'Rental income',
        optionRu: 'Доход от аренды',
        optionUz: 'Ijara daromadi',
      },
      {
        id: 3,
        optionEn: 'Receiving funds from abroad',
        optionRu: 'Получение средств из-за рубежа',
        optionUz: 'Chet eldan mablag\' olish',
      },
      {
        id: 4,
        optionEn: 'Pension',
        optionRu: 'Пенсия',
        optionUz: 'Pensiya',
      },
      {
        id: 5,
        optionEn: 'Dividends',
        optionRu: 'Дивиденды',
        optionUz: 'Dividendlar',
      },
      {
        id: 6,
        optionEn: 'Business income',
        optionRu: 'Доход от предпринимательской деятельности',
        optionUz: 'Biznes daromadi',
      },
      {
        id: 7,
        optionEn: 'Social security payments',
        optionRu: 'Выплаты по социальному обеспечению',
        optionUz: 'Ijtimoiy sug\'urta to\'lovlar',
      },
      {
        id: 8,
        optionEn: 'Other',
        optionRu: 'Другое',
        optionUz: 'Boshqa',
      },
    ];

    const body = {
      questionnaireId: 1,
      firstname: 'Жахонгир',
      lastname: 'Муталов',
      middlename: 'Зокиржон угли',
      pinfl: '31007920223003',
      claimId: '62179322',
      lang: 'UZ',
      currencyType: 'UZS',
      answers: {
        microloan_term: {
          questionId: 2,
          questionName: 'microloan_term',
          questionEn: 'Loan term (month)',
          questionRu: 'Срок займа (месяц)',
          questionUz: 'Kredit muddati (oy)',
          type: 'FILL',
          set: false,
          answerSet: null,
          options: {},
          regex: '^(0|[1-9]\d*)$',
          constrains: 'ONLY_NUMERIC',
          value: String(microloanTerm),
          results: {},
        },
        income_per_month: {
          questionId: 3,
          questionName: 'income_per_month',
          questionEn: 'Amount of income',
          questionRu: 'Сумма дохода',
          questionUz: 'Daromad miqdori',
          type: 'SELECT_FILL_SET',
          set: true,
          answerSet: {
            main_income: {
              questionPairId: 1,
              questionPairName: 'main_income',
              questionEn: 'An income type that contains the following variations:',
              questionRu: 'Тип дохода, которые содержит следующие вариации:',
              questionUz: 'Quyidagi o\'zgarishlarni o\'z ichiga olgan daromad turi:',
              type: 'SELECT_FILL',
              options: requestIncomeOptions,
              regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
              constrains: 'ONLY_NUMERIC',
              value: String(mainIncomeValue),
              results: mainIncome ? [mainIncome.value] : [],
            },
            extra_income: {
              questionPairId: 2,
              questionPairName: 'extra_income',
              questionEn: 'Type of additional income:',
              questionRu: 'Тип дополнительных доходов:',
              questionUz: 'Qo\'shimcha daromad tur',
              type: 'SELECT_FILL',
              options: requestIncomeOptions,
              regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
              constrains: 'ONLY_NUMERIC',
              value: String(extraIncomeValue),
              results: extraIncome?.length ? extraIncome.map(item => item.value) : [],
            },
          },
          options: {},
          regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
          constrains: 'ONLY_NUMERIC',
          value: String(mainIncomeValue + extraIncomeValue),
          results: {},
        },
        expenditure_per_month: {
          questionId: 7,
          questionName: 'expenditure_per_month',
          questionEn: 'Expenses per month, including payments on other loans, food expenses, utility bills',
          questionRu: 'Расходы в месяц , включая платежи по другим кредитам, расходы на питание, коммунальные платежи',
          questionUz: 'Oylik xarajatlar, shu jumladan boshqa kreditlar bo\'yicha to\'lovlar, oziq-ovqat, kommunal to\'lovlar',
          type: 'FILL',
          set: false,
          answerSet: null,
          options: {},
          regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
          constrains: 'ONLY_NUMERIC',
          value: String(expenditurePerMonth),
          results: {},
        },
        microloan_amount: {
          questionId: 1,
          questionName: 'microloan_amount',
          questionEn: 'Amount microloan',
          questionRu: 'Сумма микрозайма',
          questionUz: 'Mikrokredit miqdori',
          type: 'FILL',
          set: false,
          answerSet: null,
          options: {},
          regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
          constrains: 'ONLY_NUMERIC',
          value: String(microloanAmount),
          results: null,
        },
        education_level: {
          questionId: 4,
          questionName: 'education_level',
          questionEn: 'The level of educationLevel',
          questionRu: 'Уровень образования',
          questionUz: 'Ta\'lim darajasi',
          type: 'SELECT',
          set: false,
          answerSet: null,
          options: [
            {
              id: 1,
              optionEn: 'Incomplete secondary educationLevel (school)',
              optionRu: 'Неоконченное среднее образование (школа)',
              optionUz: 'To\'liq bo\'lmagan o\'rta ta\'lim (maktab)',
            },
            {
              id: 2,
              optionEn: 'General secondary educationLevel (school)',
              optionRu: 'Общее среднее образование (школа)',
              optionUz: 'Umumiy o\'rta ta\'lim (maktab)',
            },
            {
              id: 3,
              optionEn: 'Secondary special/professional educationLevel (college, technical school)',
              optionRu: 'Средне специальное/профессиональное образование (колледж, техникум)',
              optionUz: 'O\'rta maxsus/kasbiy ta\'lim (kollej, texnikum)',
            },
            {
              id: 4,
              optionEn: 'Incomplete higher educationLevel',
              optionRu: 'Неоконченное высшее образование',
              optionUz: 'Tugallanmagan oliy ma\'lumot',
            },
            {
              id: 5,
              optionEn: 'Bachelor/Master',
              optionRu: 'Бакалавр/Магистр',
              optionUz: 'Bakalavr/Magistr',
            },
            {
              id: 6,
              optionEn: 'PHD',
              optionRu: 'Доктор наук',
              optionUz: 'PhD',
            },
          ],
          regex: '',
          constrains: '',
          value: '',
          results: educationLevel ? [educationLevel.value] : [],
        },
        car_ownership: {
          questionId: 8,
          questionName: 'car_ownership',
          questionEn: 'Vehicle number and series, vehicle model and number',
          questionRu: 'Номер и серия транспортного средства, модель и номер машины',
          questionUz: 'Avtomobil raqami va seriyasi, avtomobil modeli va raqami',
          type: 'FILL',
          set: false,
          answerSet: null,
          options: {},
          regex: '',
          constrains: '',
          value: vehicleSeries + vehicleModel + registrationNumber,
          results: {},
        },
        home_ownership: {
          questionId: 5,
          questionName: 'home_ownership',
          questionEn: 'Home ownership status + cadastral number',
          questionRu: 'Статус владения жильем + кадастровый номер',
          questionUz: 'Uy-joy mulkdorligi holati + kadastr raqami',
          type: 'SELECT_FILL',
          set: false,
          answerSet: null,
          options: [
            {
              id: 1,
              optionEn: 'Customer Owned',
              optionRu: 'Принадлежит клиенту',
              optionUz: 'Xaridorga tegishli',
            },
            {
              id: 2,
              optionEn: 'Owned by spouse',
              optionRu: 'В собственности супруга/супруги',
              optionUz: 'Turmush o\'rtog\'iga tegishli',
            },
            {
              id:3,
              optionEn: 'Owned by a family member',
              optionRu: 'Принадлежит члену семьи',
              optionUz: 'Oila a\'zosiga tegishli',
            },
            {
              id:4,
              optionEn: 'Rented',
              optionRu: 'Взято в аренду',
              optionUz: 'Ijaraga olingan',
            },
            {
              id:5,
              optionEn: 'On bail',
              optionRu: 'Заложено',
              optionUz: 'Garovda',
            },
            {
              id:6,
              optionEn: 'Other',
              optionRu: 'Другое',
              optionUz: 'Boshqa',
            },
          ],
          regex: '',
          constrains: '',
          value: cadastralNumber,
          results: homeOwnershipStatus ? [homeOwnershipStatus.value]: [],
        },
        people_in_care: {
          questionId: 6,
          questionName: 'people_in_care',
          questionEn: 'Number of people in care',
          questionRu: 'Количество человек на попечении',
          questionUz: 'Qariyalar soni',
          type: 'SELECT',
          set: false,
          answerSet: null,
          options: [
            {
              id: 1,
              optionEn: '1',
              optionRu: '1',
              optionUz: '1',
            },
            {
              id: 2,
              optionEn: '2',
              optionRu: '2',
              optionUz: '2',
            },
            {
              id: 3,
              optionEn: '3',
              optionRu: '3',
              optionUz: '3',
            },
            {
              id: 4,
              optionEn: '4',
              optionRu: '4',
              optionUz: '4',
            },
            {
              id: 5,
              optionEn: '5',
              optionRu: '5',
              optionUz: '5',
            },
            {
              id: 6,
              optionEn: '6',
              optionRu: '6',
              optionUz: '6',
            },
            {
              id: 7,
              optionEn: '7',
              optionRu: '7',
              optionUz: '7',
            },
          ],
          regex: '',
          constrains: '',
          value: '',
          results: peopleInCare ? [peopleInCare.value]: [],
        },
      },
    };
    return axiosInstance.post('/questionnaire', body);
  };

  return <Column alignItems={'flex-start'} margin={'20px'}>
    <Row justifyContent={'center'} padding={'50px'}>
      <Text fontSize={'40px'}>Scoring</Text>
    </Row>
    <Column width={'100%'} alignItems={'center'} backgroundColor={theme.backgroundColors.secondary}
            padding={'60px 0'}>
      <Row justifyContent={'center'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Сумма микрозайма:</Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'} value={microloanAmount} onChange={setMicroloanAmount} extraInputText={'сум'}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Срок займа:</Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'positiveInteger'} value={microloanTerm} onChange={setMicroloanTerm} extraInputText={'месяцев'}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Тип дохода:</Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={mainIncome}
                    onChange={setMainIncome}
                    options={mainIncomeOptions}
                    width={itemWidth}
                    clearAction={clearIncomeType}/>
        </Row>
      </Row>
      {!!mainIncome && <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Сумма дохода:</Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'} value={mainIncomeValue} onChange={setMainIncomeValue} extraInputText={'сум'}/>
        </Row>
      </Row>}
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Тип дополнительных доходов:</Text>
        </Row>
        <Row width={itemWidth}>
          <MultiDropdown value={extraIncome}
                         onChange={setExtraIncome}
                         options={extraIncomeOptions}
                         disabled={!mainIncome}
                         width={itemWidth}/>
        </Row>
      </Row>
      {!!extraIncome?.length && <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Сумма дополнительных доходов:</Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'} value={extraIncomeValue} onChange={setExtraIncomeValue} extraInputText={'сум'}/>
        </Row>
      </Row>}
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Уровень образования:</Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={educationLevel} onChange={setEducationLevel} options={educationOptions} width={itemWidth}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Статус владения жильем:</Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={homeOwnershipStatus} onChange={setHomeOwnershipStatus} options={ownershipStatusOptions} width={itemWidth}/>
        </Row>
      </Row>
      {!!homeOwnershipStatus && <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Кадастровый номер:</Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={cadastralNumber} onChange={setCadastralNumber}/>
        </Row>
      </Row>}
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Количество человек на попечении:</Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={peopleInCare} onChange={setPeopleInCare} options={peopleInCareOptions} width={itemWidth}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Расходы в месяц:</Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'} value={expenditurePerMonth} onChange={setExpenditurePerMonth} extraInputText={'сум'}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Номер и серия транспортного средства:</Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={vehicleSeries} onChange={changeVehicleSeries} maxLength={10} upperCaseOnly={true}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Модель транспортного средства:</Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={vehicleModel} onChange={setVehicleModel}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>Регистрационный номер транспортного средства:</Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={registrationNumber} onChange={changeRegistrationNumber} maxLength={8} upperCaseOnly={true}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Button type={'submit'} label={'Отправить'} action={() => submitQuestionnaire()}/>
      </Row>
    </Column>
  </Column>;
});
