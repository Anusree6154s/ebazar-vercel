import { ArrowLeftIcon, CheckCircleIcon, KeyIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetOTPSentStatus, resetPasswordAsync, resetPasswordResetStatus, selectAuthStatus, selectOTPSentStatus, selectPasswordResetStatus, selectUserId, sendOTPAsync } from "../../redux";
import { Loader } from '../common/Loader';


function ForgotPassword() {
    const otp_sent_status = useSelector(selectOTPSentStatus)
    const password_reset_status = useSelector(selectPasswordResetStatus)
    const auth_status = useSelector(selectAuthStatus)
    const userId = useSelector(selectUserId)

    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState({
        form1: true,
        form2: false,
        form3: false
    })
    const [OTP, setOTP] = useState(null)
    const [OTPVerificationStatus, setOTPVerificationStatus] = useState(null)

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center h-screen overflow-hidden">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-[#afe3ffed] text-center hidden lg:flex justify-center">
                    <img src="/images/forgot-password-image.png" alt="" />
                </div>
                <div className="lg:w-1/2 xl:w-5/12 ">

                    <Alerts
                        otp_sent_status={otp_sent_status}
                        dispatch={dispatch}
                        setShowForm={setShowForm}
                        OTPVerificationStatus={OTPVerificationStatus}
                        setOTPVerificationStatus={setOTPVerificationStatus}
                        password_reset_status={password_reset_status}
                    />

                    <div className="mt-10 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Forgot Password</h1>
                    </div>

                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            <Form1
                                setOTP={setOTP}
                                dispatch={dispatch}
                                auth_status={auth_status}
                                showForm={showForm}
                            />
                            <Form2
                                setShowForm={setShowForm}
                                OTP={OTP}
                                setOTPVerificationStatus={setOTPVerificationStatus}
                                auth_status={auth_status}
                                showForm={showForm}
                            />
                            <Form3
                                setShowForm={setShowForm}
                                dispatch={dispatch}
                                userId={userId}
                                auth_status={auth_status}
                                password_reset_status={password_reset_status}
                                showForm={showForm}
                            />

                            <p className="mt-6 text-xs text-gray-600 text-center">
                                <span>Go back to </span>
                                <button onClick={() => navigate('/login')} className="border-b border-primary border-dotted text-primary hover:text-primary-hover font-bold">
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Alerts = ({
    otp_sent_status,
    dispatch,
    setShowForm,
    OTPVerificationStatus,
    setOTPVerificationStatus,
    password_reset_status }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        const action = (snackbarId) => (
            <XMarkIcon onClick={() => closeSnackbar(snackbarId)} />
        )
        const snackbarProps = {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            action
        }

        if (otp_sent_status.fail) {
            enqueueSnackbar(otp_sent_status.fail, { variant: 'warning', ...snackbarProps });
            dispatch(resetOTPSentStatus())
        }else if (otp_sent_status.success) {
            enqueueSnackbar(otp_sent_status.success, { variant: 'success', ...snackbarProps });
            dispatch(resetOTPSentStatus())
            setShowForm(prev => ({ ...prev, form1: false, form2: true }))
        }

        if (OTPVerificationStatus === 'fail') {
            enqueueSnackbar('Wrong OTP', { variant: 'error', ...snackbarProps });
            setOTPVerificationStatus(null)
        } else if (OTPVerificationStatus === 'success') {
            enqueueSnackbar('OTP Verified', { variant: 'success', ...snackbarProps });
            setOTPVerificationStatus(null)
        }

        if (password_reset_status.fail) {
            enqueueSnackbar('Password Reset Failed', { variant: 'error', ...snackbarProps });
            dispatch(resetPasswordResetStatus())
        } else if (password_reset_status.success) {
            enqueueSnackbar('Password has been Reset', { variant: 'success', ...snackbarProps });
            dispatch(resetPasswordResetStatus())
        }

    }, [enqueueSnackbar, closeSnackbar, otp_sent_status, dispatch, setShowForm, setOTPVerificationStatus, OTPVerificationStatus,  password_reset_status]);
}

const Form1 = ({ setOTP, dispatch, auth_status, showForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleSubmitParam = async (data) => {
        const otp = Math.floor(Math.random() * 9000 + 1000)
        if (otp) {
            setOTP(otp)
            dispatch(sendOTPAsync({ email: data.email, OTP: otp }))
        }
    }

    return <form
        noValidate
        method="POST"
        onSubmit={handleSubmit(handleSubmitParam)}
        className={!showForm.form1 ? 'hidden' : ''}
    >
        <input
            {...register('email', {
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Email not valid'
                }
            })}
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}


        <button type="submit" className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <span className="mr-3">Send Email</span>
            {auth_status === 'loading' ?
                <Loader />
                : <PaperAirplaneIcon className="w-6 h-6" />
            }
        </button>

    </form>

}

const Form2 = ({ setShowForm, OTP, setOTPVerificationStatus, auth_status, showForm }) => {
    const handleBack = () => {
        setShowForm(prev => ({ ...prev, form1: true, form2: false }))
    }

    const handleNext = () => {
        setOTPVerificationStatus('success')
        setShowForm(prev => ({ ...prev, form2: false, form3: true }))
    }


    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm()

    const handleSubmitParam = async (data) => {
        if (Number(data.otp) === OTP) handleNext()
        else setOTPVerificationStatus('fail')
    }


    return <div className={showForm.form2 ? '' : 'hidden'}>
        <div onClick={handleBack} className='cursor-pointer p-2 mb-5 flex items-center w-fit rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700 ' >
            <ArrowLeftIcon className='h-6 w-6 inline-block mr-2' />
            Back
        </div>

        <form
            noValidate
            method="POST"
            onSubmit={handleSubmit2(handleSubmitParam)}
        >
            <input
                {...register2('otp', {
                    required: 'OTP is required'
                })}
                id='otp'
                type="number"
                placeholder="OTP"
                inputMode="numeric"
                onWheel={(e) => e.target.blur()}
                autoComplete="otp"
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                style={{ /* CSS to hide arrows */
                    '-moz-appearance': 'none', /* Firefox */
                    'appearance': 'none', /* Chrome, Safari, Edge, Opera */
                    'WebkitAppearance': 'none'
                    // no style seems to remove the arrows
                }}
            />
            {errors2.otp && <p className="text-red-500">{errors2.otp.message}</p>}

            <button type="submit" className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span className="mr-3">Verify OTP</span>
                {auth_status === 'loading' ?
                    <Loader />
                    : <CheckCircleIcon className='w-6 h-6' />
                }
            </button>

        </form>

    </div>
}

const Form3 = ({
    setShowForm,
    dispatch,
    userId,
    auth_status,
    showForm,
    password_reset_status }) => {

    const navigate = useNavigate()

    const handleBack = () => {
        setShowForm(prev => ({ ...prev, form3: false, form2: true }))
    }

    const {
        register: register3,
        handleSubmit: handleSubmit3,
        formState: { errors: errors3 },
    } = useForm()

    const handleSubmitParam = (data) => {
        dispatch(resetPasswordAsync({ password: data.password, userId }))
    }

    useEffect(()=>{
        if(password_reset_status.success)
            navigate('/login')
    }, [navigate, password_reset_status])

    return  <div className={showForm.form3 ? '' : 'hidden'}>
        <div onClick={handleBack} className='cursor-pointer p-2 mb-5 flex items-center w-fit rounded-md hover:bg-gray-50  dark:text-gray-300 dark:hover:bg-gray-700 ' >
            <ArrowLeftIcon className='h-6 w-6 inline-block mr-2' />
            Back
        </div>

        <form
            noValidate
            method="POST"
            onSubmit={handleSubmit3(handleSubmitParam)}
        >
            <input
                {...register3('password', {
                    required: 'Password is required'
                })}
                id="password"
                type="password"
                autoComplete="password"
                placeholder="Enter New Password"
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            />
            {errors3.password && <p className="text-red-500">{errors3.password.message}</p>}

            <button type="submit" className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span className="mr-3">
                    {auth_status==='loading'  ? 'Redirecting to Login' : 'Reset Password'}
                </span>
                {auth_status==='loading'  ?
                    <Loader />
                    : <KeyIcon className='w-6 h-6' />
                }
            </button>

        </form>
    </div>
}
export default ForgotPassword;