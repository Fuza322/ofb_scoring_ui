import React, {useMemo, useState} from 'react';
import {useTheme} from 'styled-components';
import {useSelector} from 'react-redux';
import {axiosInstance} from '../api/api';
import {AppRootStateType} from '../app/store';
import {LanguageType} from '../app/app-reducer';
import {Option, displayCurrency, displayMonth} from '../shared/utils';
import {Row} from '../shared/components/Row';
import {Column} from '../shared/components/Column';
import {Text} from '../shared/components/Text';
import {TextInput} from '../shared/components/TextInput';
import {NumberInput} from '../shared/components/NumberInput';
import {MultiDropdown} from '../shared/components/MultiDropdown';
import {Dropdown} from '../shared/components/Dropdown';
import {Button} from '../shared/components/Button';

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
  const [techPassport, setTechPassport] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  const language = useSelector<AppRootStateType, LanguageType>(state => state.app.language);

  const incomeOptions = useMemo(() => [
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
      optionEn: 'Pension',
      optionRu: 'Пенсия',
      optionUz: 'Pensiya',
    },
    {
      id: 4,
      optionEn: 'Dividends',
      optionRu: 'Дивиденды',
      optionUz: 'Dividendlar',
    },
    {
      id: 5,
      optionEn: 'Business income',
      optionRu: 'Доход от предпринимательской деятельности',
      optionUz: 'Biznes daromadi',
    },
    {
      id: 6,
      optionEn: 'Social security payments',
      optionRu: 'Выплаты по социальному обеспечению',
      optionUz: 'Ijtimoiy sug\'urta to\'lovlar',
    },
    {
      id: 7,
      optionEn: 'Other',
      optionRu: 'Другое',
      optionUz: 'Boshqa',
    },
  ], []);

  //TODO Get answers object from API call when axios will be setting up*/}
  const answers = {
    microloan_term: {
      questionId: 2,
      questionName: 'microloan_term',
      questionEn: 'Loan term (month)',
      questionRu: 'Срок займа (месяц)',
      questionUz: 'Kredit muddati (oy)',
      type: 'PROGRESS_BAR_FILL',
      set: false,
      answerSet: null,
      options: [],
      regex: '^(0|[1-9]\d*)$',
      constrains: 'ONLY_NUMERIC',
      value: String(microloanTerm),
      results: [],
    },
    income_per_month: {
      questionId: 3,
      questionName: 'income_per_month',
      questionEn: 'Amount of income',
      questionRu: 'Сумма дохода',
      questionUz: 'Daromad miqdori',
      type: 'MULTI_CHOICE_FILL_SET',
      set: true,
      answerSet: {
        main_income: {
          questionPairId: 1,
          questionPairName: 'main_income',
          questionEn: 'An income type that contains the following variations:',
          questionRu: 'Тип дохода, которые содержит следующие вариации:',
          questionUz: 'Quyidagi o\'zgarishlarni o\'z ichiga olgan daromad turi:',
          type: 'MULTI_CHOICE_FILL',
          options: incomeOptions,
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
          type: 'MULTI_CHOICE_FILL',
          options: incomeOptions,
          regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
          constrains: 'ONLY_NUMERIC',
          value: String(extraIncomeValue),
          results: extraIncome?.length ? extraIncome.map(item => item.value) : [],
        },
      },
      options: [],
      regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
      constrains: 'ONLY_NUMERIC',
      value: String(mainIncomeValue + extraIncomeValue),
      results: [],
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
      options: [],
      regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
      constrains: 'ONLY_NUMERIC',
      value: String(expenditurePerMonth),
      results: [],
    },
    microloan_amount: {
      questionId: 1,
      questionName: 'microloan_amount',
      questionEn: 'Amount microloan',
      questionRu: 'Сумма микрозайма',
      questionUz: 'Mikrokredit miqdori',
      type: 'PROGRESS_BAR_FILL',
      set: false,
      answerSet: null,
      options: [],
      regex: '^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$',
      constrains: 'ONLY_NUMERIC',
      value: String(microloanAmount),
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
      questionEn: 'Vehicle number and series, registration certificate number and series, vehicle model',
      questionRu: 'Номер и серия транспортного средства, номер и серия техпаспорта, модель транспортного средства',
      questionUz: 'Avtomobil raqami va seriyasi, ro\'yxatga olish guvohnomasi raqami va seriyasi, avtomobil modeli',
      type: 'FILL_SET',
      set: true,
      questionSet: {
        tex_passport: {
          id: 1,
          name: 'tex_passport',
          questionEn: 'Registration certificate number and series:',
          questionRu: 'Номер и серия техпаспорта:',
          questionUz: 'Ro\'yxatga olish guvohnomasi raqami va seriyasi:',
          type: 'FILL',
          options: [],
          regex: '',
          constrains: '',
          value: techPassport,
          results: [],
        },
        plate_number: {
          id: 2,
          name: 'plate_number',
          questionEn: 'Vehicle number and series:',
          questionRu: 'Номер и серия транспортного средства:',
          questionUz: 'Avtomobil raqami va seriyasi:',
          type: 'FILL',
          options: [],
          regex: '',
          constrains: '',
          value: plateNumber,
          results: [],
        },
        vehicle_model: {
          id: 3,
          name: 'vehicle_model',
          questionEn: 'Vehicle model:',
          questionRu: 'Модель транспортного средства:',
          questionUz: 'Avtomobil modeli:',
          type: 'FILL',
          options: [],
          regex: '',
          constrains: '',
          value: vehicleModel,
          results: [],
        },
      },
      options: [],
      regex: '',
      constrains: '',
      value: `${techPassport}:${plateNumber}:${vehicleModel}`,
      results: [],
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
          optionRu: 'Принадлежит клиенту (владелец)',
          optionUz: 'Xaridorga tegishli',
        },
        {
          id: 2,
          optionEn: 'Owned by spouse',
          optionRu: 'В собственности супруга/супруги',
          optionUz: 'Turmush o\'rtog\'iga tegishli',
        },
        {
          id: 3,
          optionEn: 'Owned by a family member',
          optionRu: 'Принадлежит члену семьи',
          optionUz: 'Oila a\'zosiga tegishli',
        },
        {
          id: 4,
          optionEn: 'Rented',
          optionRu: 'Взято в аренду',
          optionUz: 'Ijaraga olingan',
        },
        {
          id: 5,
          optionEn: 'On bail',
          optionRu: 'Заложено',
          optionUz: 'Garovda',
        },
        {
          id: 6,
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
  };

  function clearIncomeType() {
    setMainIncome(null);
    setMainIncomeValue('');
    setExtraIncome([]);
    setExtraIncomeValue('');
  }

  function clearExtraIncomeType() {
    setExtraIncome([]);
    setExtraIncomeValue('');
  }

  function changeTechPassport(value: string) {
    if (!!value.match(/^[a-zA-Z0-9]*$/)) {
      setTechPassport(value);
    }
  }
  function changePlateNumber(value: string) {
    if (!!value.match(/^[a-zA-Z0-9]*$/)) {
      setPlateNumber(value);
    }
  }

  const dropdownIncomeOptions = useMemo(() => incomeOptions.map(item =>
    ({name: item[`option${language.value}` as keyof Option], value: item.id})
  ), [incomeOptions, language]);

  const extraIncomeOptions = useMemo(() => mainIncome
    ? dropdownIncomeOptions.filter(option => option.name !== mainIncome['name'] && option.value !== mainIncome['value'])
    : dropdownIncomeOptions
  , [mainIncome, dropdownIncomeOptions]);

  const educationOptions = useMemo(() => answers.education_level.options.map(item =>
    ({name: item[`option${language.value}` as keyof Option], value: item.id})
  ), [answers.education_level.options, language.value]);

  const ownershipStatusOptions = useMemo(() => answers.home_ownership.options.map(item =>
    ({name: item[`option${language.value}` as keyof Option], value: item.id})
  ), [answers.home_ownership.options, language.value]);

  const peopleInCareOptions = useMemo(() => answers.people_in_care.options.map(item =>
    ({name: item[`option${language.value}` as keyof Option], value: item.id})
  ), [answers.people_in_care.options, language.value]);

  const labelContainerWidth = '230px';
  const itemWidth = '555px';

  const submitQuestionnaire = () => {
    const body = {
      questionnaireId: 1,
      firstname: 'Жахонгир',
      lastname: 'Муталов',
      middlename: 'Зокиржон угли',
      pinfl: '31007920223003',
      claimId: '62179322',
      lang: 'UZ',
      currencyType: 'UZS',
      answers: answers,
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
          <Text textAlign={'left'}>
            <>{answers.microloan_amount[`question${language.value}` as keyof typeof answers.microloan_amount]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'}
                       value={microloanAmount}
                       onChange={setMicroloanAmount}
                       extraInputText={displayCurrency[language.value]}
          />
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.microloan_term[`question${language.value}` as keyof typeof answers.microloan_term]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'positiveInteger'}
                       value={microloanTerm}
                       onChange={setMicroloanTerm}
                       extraInputText={displayMonth[language.value]}
          />
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.income_per_month.answerSet.main_income[
                `question${language.value}` as keyof typeof answers.income_per_month.answerSet.main_income
            ]}</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={mainIncome}
                    onChange={setMainIncome}
                    clearAction={clearIncomeType}
                    options={dropdownIncomeOptions}
                    width={itemWidth}/>
        </Row>
      </Row>
      {!!mainIncome && <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.income_per_month[`question${language.value}` as keyof typeof answers.income_per_month]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'}
                       value={mainIncomeValue}
                       onChange={setMainIncomeValue}
                       extraInputText={displayCurrency[language.value]}
          />
        </Row>
      </Row>}
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.income_per_month.answerSet.extra_income[
                `question${language.value}` as keyof typeof answers.income_per_month.answerSet.extra_income
            ]}</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <MultiDropdown value={extraIncome}
                         onChange={setExtraIncome}
                         clearAction={clearExtraIncomeType}
                         options={extraIncomeOptions}
                         disabled={!mainIncome}
                         width={itemWidth}/>
        </Row>
      </Row>
      {!!extraIncome?.length && <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.income_per_month[`question${language.value}` as keyof typeof answers.income_per_month]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'}
                       value={extraIncomeValue}
                       onChange={setExtraIncomeValue}
                       extraInputText={displayCurrency[language.value]}
          />
        </Row>
      </Row>}
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.education_level[`question${language.value}` as keyof typeof answers.education_level]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={educationLevel} onChange={setEducationLevel} options={educationOptions} width={itemWidth}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'} >
            <>{String(answers.home_ownership[`question${language.value}` as keyof typeof answers.home_ownership])
              ?.split('+')[0].trim()}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={homeOwnershipStatus} onChange={setHomeOwnershipStatus} options={ownershipStatusOptions} width={itemWidth}/>
        </Row>
      </Row>
      {!!homeOwnershipStatus && <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{String(answers.home_ownership[`question${language.value}` as keyof typeof answers.home_ownership])
              ?.split('+')[1].trim()}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={cadastralNumber} onChange={setCadastralNumber}/>
        </Row>
      </Row>}
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.people_in_care[`question${language.value}` as keyof typeof answers.people_in_care]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <Dropdown value={peopleInCare} onChange={setPeopleInCare} options={peopleInCareOptions} width={itemWidth}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.expenditure_per_month[`question${language.value}` as keyof typeof answers.expenditure_per_month]}:</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <NumberInput type={'currency'}
                       value={expenditurePerMonth}
                       onChange={setExpenditurePerMonth}
                       extraInputText={displayCurrency[language.value]}
          />
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.car_ownership.questionSet.tex_passport[`question${language.value}` as keyof typeof answers.car_ownership.
                questionSet.tex_passport]}</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={techPassport} onChange={changeTechPassport} placeholder={'XXX1234567'} maxLength={10} upperCaseOnly={true}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.car_ownership.questionSet.plate_number[`question${language.value}` as keyof typeof answers.car_ownership.
                questionSet.plate_number]}</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={plateNumber} onChange={changePlateNumber} placeholder={'XXXXXXXX'} maxLength={8} upperCaseOnly={true}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        <Row width={labelContainerWidth} padding={'0 25px 0 0'}>
          <Text textAlign={'left'}>
            <>{answers.car_ownership.questionSet.vehicle_model[`question${language.value}` as keyof typeof answers.car_ownership.
                questionSet.vehicle_model]}</>
          </Text>
        </Row>
        <Row width={itemWidth}>
          <TextInput value={vehicleModel} onChange={setVehicleModel} placeholder={'BYD-SONG-PLUS'}/>
        </Row>
      </Row>
      <Row justifyContent={'center'} margin={'28px 0 0 0'}>
        {/*TODO Uncomment submit button, when axios will be setting up*/}
        {/*<Button type={'submit'}
                label={language.value === 'En' ? 'Send': language.value === 'Ru' ? 'Отправить' : 'Yuboring'}
                action={() => submitQuestionnaire()}
        />*/}
        <Button type={'submit'}
                label={language.value === 'En' ? 'Send': language.value === 'Ru' ? 'Отправить' : 'Yuboring'}
                action={() => {}}
        />
      </Row>
    </Column>
  </Column>;
});
