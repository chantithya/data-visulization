import csv
import json
import os
from pathlib import Path

def csv_to_json(csv_file_path, json_file_path=None, encoding='utf-8'):
    """
    Convert a CSV file to a JSON file.
    
    Args:
        csv_file_path (str): Path to the CSV file
        json_file_path (str, optional): Path to save the JSON file. 
            If None, uses same path as CSV with .json extension
        encoding (str): File encoding (default: utf-8)
    """
    # If no JSON path provided, use CSV path with .json extension
    if json_file_path is None:
        json_file_path = os.path.splitext(csv_file_path)[0] + '.json'
    
    # Read CSV and convert to JSON
    data = []
    with open(csv_file_path, mode='r', encoding=encoding) as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)
    
    # Write JSON file
    with open(json_file_path, mode='w', encoding=encoding) as json_file:
        json.dump(data, json_file, indent=2)
    
    print(f"Successfully converted {csv_file_path} to {json_file_path}")

if __name__ == "__main__":
    # Example usage - modify these paths as needed
    project_root = Path(__file__).parent.parent
    csv_path = project_root / "public" / "data" / "casetify_products.csv"  # Change to your CSV path
    json_path = project_root / "src" / "data" / "data.json"  # Change to desired output path
    
    # Create directories if they don't exist
    json_path.parent.mkdir(parents=True, exist_ok=True)
    
    csv_to_json(csv_path, json_path)