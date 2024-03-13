import joblib

unique_labels = {
                    0: 'Actinic keratoses', 
                    1: 'Basal cell carcinoma', 
                    2: 'Benign keratosis-like lesions', 
                    3: 'Dermatofibroma', 
                    4: 'Melanocytic nevi',
                    5: 'Melanoma',
                    6: 'Vascular lesions'
}

joblib.dump(unique_labels,'unique_labels.joblib')