import Image from 'next/image'
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png'
import logoImg from '../assets/logo.svg'
import avatares from '../assets/avatares.png'
import iconCheckImg from '../assets/icon.svg'
import { api } from '../lib/axios'


interface HomeProps{
  poolCount: number;
  guessCount: number;
  userCount: number;
}


export default function Home(props: HomeProps) {
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main className=''>
        <Image src={logoImg} alt="NLW COPA"/>

        <h1 className='mt-12 text-white text-4xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-8 flex items-center gap-2'>
          <Image src={avatares} alt=""/>
          <strong className='text-gray-100 text-xl'>
            <span className='text-iginite-500'>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form className='mt-8 flex gap-2'>
          <input className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm' type="text" required placeholder='Qual nome do seu bolão?'/>
          <button className='bg-yellow-500  px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700' type='submit'>Criar meu bolão</button>
        </form>

        <p className='mt-2 text-smt text-gray-300 leading-relaxed'>
         Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-8 pt-10 border-t border-gray-600  flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'/>

          <div className='flex items-center gap-6'>
          <Image src={iconCheckImg} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image height={700} quality={100} src={appPreviewImg} alt="Dois celulares mostrando a prévia da aplicação movel da NLW COPA" />
    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCountResponse,guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props : {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}