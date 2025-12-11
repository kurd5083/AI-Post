import BlocksItems from '@/shared/BlocksItems'
import BtnBase from '@/shared/BtnBase'
import InputPlus from '@/shared/InputPlus'

const CompilationUploadPopup = () => {

    return (
        <div>
            <InputPlus title="ИСТОЧНИК" placeholder="Введите свой источник" img="crimson" />
            <BlocksItems items={['habr.com', 'youtube.com', 'facebook.com']} color="#EF6284" />
            <BtnBase $margin="48">Вернуться в подборки</BtnBase>
        </div>
    )
}

export default CompilationUploadPopup
