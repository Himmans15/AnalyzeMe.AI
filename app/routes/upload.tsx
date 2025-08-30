import { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader'
import Navbar from '~/components/Navbar'
import { usePuterStore } from '~/lib/puter'
 
 const upload = () => {
   const {auth, isLoading, fs, ai, kv} = usePuterStore()
   const [isProcessing, setIsProcessing] = useState(false)
   const [statusText, setStatusText] = useState('')
   const [file, setFile] = useState<File | null>(null)

   const handleFileSelect = (file: File | null) =>{
    setFile(file)
   }

   const handleAnalyze = async ({companyName,jobTitle,jobDescription,file} : {companyName: string, jobTitle : string, jobDescription : string, file : File}) =>{

    setIsProcessing(true);
    setStatusText("Uploading the file...")

    const uploadedFile = await fs.upload([file]);
   }
   const handledSubmit =(e : FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form = e.currentTarget.closest('form');
        if(!form) return ;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;
        
        handleAnalyze({companyName, jobTitle, jobDescription, file});
   }
   return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
        <div className='page-heading py-16'>
            <h1>Smart feedback for your dream job</h1>
            {isProcessing ? (
                <>
                <h2>{statusText}</h2>
                <img src='/images/resume-scan.gif' className='w-full '/>
                </>
            ):(
                <h2>Drop your resume for an ATS Score and improvement tip </h2>
            )}
            {!isProcessing ? (
                <form id='upload-form' onSubmit={handledSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='form-div'>
                        <label htmlFor='company-name'> Company Name</label>
                        <input type='text' name='company-name' placeholder='Company Name' id='company-name' />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='job-tittle'> Job Tittle</label>
                        <input type='text' name='job-tittle' placeholder='Job Tittle' id='job-tittle' />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='job-description'> Job Description</label>
                        <textarea rows={5} name='job-description' placeholder='Job Description' id='job-description' />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='uploader'>Upload Resume</label>
                       <FileUploader onFileSelect={handleFileSelect}/>
                    </div>
                   <button className='primary-button' type='submit'>
                    Analyze Resume
                   </button>
                </form>
            ):(
                <></>
            )}
        </div>
        </section>
     </main>   
   )
 }
 
 export default upload