import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { IRootStateType, TAppDispatchType } from '../../store';
import { IFilterType, IFiltersStateType, activeFilterChanged, fetchFilters } from './filtersSlice';
import Spinner from '../spinner/Spinner';
import p from '../../../lib/print';

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector<IRootStateType, IFiltersStateType>(state => state.filtersReducer);
    
    const dispatch = useDispatch<TAppDispatchType>();
    const { request } = useHttp();

    useEffect(() => {
        dispatch( fetchFilters() );
        p('HeroesFilter useEffect => render');
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr: IFilterType[]) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        // Данные в json-файле я расширил классами и текстом
        return arr.map(({name, className, label}) => {
            // Используем библиотеку classnames и формируем классы динамически
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch( activeFilterChanged(name) )}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;